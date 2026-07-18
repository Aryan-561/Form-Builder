import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";

export function TemplatesSection() {
  const templates = [
    {
      title: "Event RSVP",
      desc: "Perfect for weddings & conferences",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWfGh0h3xOWR-hEWFPCtb7ObF6zzTkUs1nlkqle-4AV9fUnXFL99GL1180MuLrQCLFYNuyKHBu1_ahHzs57a5DaurB_amd708oTnEl_O9sZhVBiIutjP1quD4uwTOeZrViqL5NDM3FvCZQ8htaE_Jsv59qBHeMVy0nagGPqto7XU7hC_0UeFLT56yfLgIsd2c_erWfLQ2Kz6ra0KXM09yBgWfopLWoNQnas6FfnNzbyZ-3Qd7VZ_rTmGxZBjyzd1MOO_ozh5omK9vF"
    },
    {
      title: "Product Feedback",
      desc: "Drive product growth with insights",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfEOzjYg0E8ickJpi72ECpLIkFGD2rXcqaf4tBvhqtVNRhcqDgcWtwvBVP4DqWi5Pn7XMlL8NeLqeSGls4oZfJUiII9v5Nzzfh_J8MCwAVYYHxL0sJ5ha-GjJZgj7T4tqPnhUW0-2b8vfNTROZnzRVwf2Jo_lMO5rSSdcgWmTHGDZUTrpZp7WP2y2Qf0HTSNLj_s9Rt4qUlcM1c__TJxImGeie9CHI0S83wZ635r9iRedlPoLt5NZx9JxiLJEvfjyt8zehnTHJdzOa"
    },
    {
      title: "Support Ticket",
      desc: "Streamline your customer helpdesk",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOnIfLBPsBSmWdVjtEVT5lA_14SKv6jX07onHeRf8csCzDdqcPX-VoFHOPBxoihXZoZwQYfYAV6YB4OSm65o6fXa0rva3GmE_x3svwNsmhap0vA5_vGyhQAUQhScOwxZ_u1VsYayTYNTFCKvOe-fkBpKwsSwEL35ZdgJPk01MxxQ9CAHukd5TlGX3pbxY6HM5lmeXx72EKJroRiFztALqU1ykmfLKhircpuU31LwVHTfxylleIgn_B3SJ6ZczNHJPJKWPx8XTF0Cl0"
    }
  ];

  return (
    <section className="py-20 overflow-hidden px-4 md:px-10 bg-background" id="templates">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="font-sans text-3xl font-semibold text-foreground mb-4">Ready-to-use Templates</h2>
            <p className="font-sans text-base text-muted-foreground">
              Jumpstart your workflow with these conversion-optimized layouts. Fully customizable to match your brand identity.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
          {templates.map((tpl, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[400px] snap-start">
              <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-md bg-muted">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={tpl.title} 
                  src={tpl.image} 
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button className="bg-white text-primary hover:bg-white/90 font-bold shadow-lg">Use Template</Button>
                </div>
              </div>
              <h4 className="font-sans text-xl font-semibold text-foreground">{tpl.title}</h4>
              <p className="font-sans text-sm text-muted-foreground">{tpl.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
