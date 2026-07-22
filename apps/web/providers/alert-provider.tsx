"use client";

import React, { createContext, useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { ConfirmationDialogUI, AlertVariant } from "~/components/confirmation-dialog";

export interface AlertPromiseOptions<T = any> {
  variant?: AlertVariant;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  action: () => Promise<T> | T;
  success?: string | ((data: T) => string);
  error?: string | ((err: any) => string);
  onSuccess?: (data: T) => void;
  onError?: (err: any) => void;
}

export interface AlertContextType {
  promise: <T = any>(options: AlertPromiseOptions<T>) => Promise<T>;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface DialogState<T = any> {
  open: boolean;
  loading: boolean;
  options: AlertPromiseOptions<T> | null;
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    loading: false,
    options: null,
  });

  const resolverRef = useRef<{
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
  } | null>(null);

  const promise = useCallback(<T = any,>(options: AlertPromiseOptions<T>): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      resolverRef.current = { resolve, reject };

      setDialogState({
        open: true,
        loading: false,
        options,
      });
    });
  }, []);

  const handleCancel = useCallback(() => {
    setDialogState((prev) => ({ ...prev, open: false, loading: false }));

    if (resolverRef.current) {
      resolverRef.current.reject(new Error("User cancelled action"));
      resolverRef.current = null;
    }
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!dialogState.options) return;

    setDialogState((prev) => ({ ...prev, loading: true }));

    const { action, success, error, onSuccess, onError } = dialogState.options;

    try {
      const data = await action();

      // Trigger optional callback
      onSuccess?.(data);

      // Trigger success toast if provided
      if (success) {
        const msg = typeof success === "function" ? success(data) : success;
        toast.success(msg);
      }

      // Close dialog only on success
      setDialogState({ open: false, loading: false, options: null });

      if (resolverRef.current) {
        resolverRef.current.resolve(data);
        resolverRef.current = null;
      }
    } catch (err: any) {
      // Trigger optional callback
      onError?.(err);

      // Trigger error toast if provided
      if (error) {
        const msg = typeof error === "function" ? error(err) : err?.message || error;
        toast.error(msg);
      }

      // Keep dialog open on error, just stop loading state
      setDialogState((prev) => ({ ...prev, loading: false }));

      // Do NOT reject outer promise immediately to keep dialog retryable
    }
  }, [dialogState.options]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open && !dialogState.loading) {
        handleCancel();
      }
    },
    [dialogState.loading, handleCancel],
  );

  return (
    <AlertContext.Provider value={{ promise }}>
      {children}

      {dialogState.options && (
        <ConfirmationDialogUI
          open={dialogState.open}
          onOpenChange={handleOpenChange}
          variant={dialogState.options.variant}
          title={dialogState.options.title}
          description={dialogState.options.description}
          confirmText={dialogState.options.confirmText}
          cancelText={dialogState.options.cancelText}
          loading={dialogState.loading}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </AlertContext.Provider>
  );
}
