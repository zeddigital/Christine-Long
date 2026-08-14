import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Layout } from '@/components/layout/Layout';
import { FadeIn } from '@/components/ui/fade-in';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Please share a brief message about what brings you here'),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  function onSubmit(data: FormValues) {
    // In a real app, this would submit to an API.
    // We just show the UI success state here.
    console.log(data);
    setIsSubmitted(true);
  }

  return (
    <Layout>
      <section className="bg-porcelain py-20 md:py-32 min-h-[calc(100vh-80px)] flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column */}
            <div>
              <FadeIn>
                <h1 className="mb-6 text-4xl md:text-5xl">Start with a private conversation</h1>
                <p className="text-xl text-charcoal leading-relaxed mb-10">
                  Begin with a complimentary 20-minute Clarity Call to discuss where you are and what support may fit.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="font-serif text-2xl text-aubergine mb-3">What happens next</h3>
                    <p className="text-charcoal leading-relaxed">
                      After submitting the form, Christine will be in touch via email to arrange a suitable time for your call.
                    </p>
                  </div>

                  <div className="w-8 h-px bg-rose"></div>

                  <div>
                    <h3 className="font-serif text-xl text-aubergine mb-3">Direct Contact</h3>
                    <p className="text-charcoal leading-relaxed">
                      <a href="tel:0409140173" className="hover:text-rose transition-colors font-medium">0409 140 173</a><br />
                      <a href="mailto:hello@anewyou.com.au" className="hover:text-rose transition-colors font-medium">hello@anewyou.com.au</a>
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl text-aubergine mb-3">Locations</h3>
                    <p className="text-charcoal leading-relaxed">
                      In person: Melbourne, VIC<br />
                      Online: Australia-wide via Zoom
                    </p>
                  </div>

                  <p className="text-sm text-charcoal/60 pt-4">
                    All enquiries are treated with the strictest confidence.
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Right Column */}
            <div>
              <FadeIn direction="left" delay={0.2} className="bg-warm-white p-8 md:p-10 rounded-xl shadow-sm border border-black/[0.03]">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-champagne mx-auto mb-6" />
                    <h3 className="font-serif text-3xl text-aubergine mb-4">Request Received</h3>
                    <p className="text-charcoal leading-relaxed mb-8">
                      Thank you for reaching out. Christine will be in touch shortly to arrange your Clarity Call.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsSubmitted(false)}
                      className="border-aubergine/20 text-aubergine hover:bg-aubergine/5 rounded"
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-charcoal font-medium">Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} className="bg-porcelain border-aubergine/10 focus-visible:ring-champagne rounded-md" />
                            </FormControl>
                            <FormMessage className="text-rose" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-charcoal font-medium">Email address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Your email address" {...field} className="bg-porcelain border-aubergine/10 focus-visible:ring-champagne rounded-md" />
                            </FormControl>
                            <FormMessage className="text-rose" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-charcoal font-medium">Phone number (optional)</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="Your phone number" {...field} className="bg-porcelain border-aubergine/10 focus-visible:ring-champagne rounded-md" />
                            </FormControl>
                            <FormMessage className="text-rose" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-charcoal font-medium">What brings you here?</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Briefly describe what you are looking to address..." 
                                className="min-h-[120px] bg-porcelain border-aubergine/10 focus-visible:ring-champagne rounded-md resize-y" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-rose" />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full bg-rose hover:bg-rose/90 text-warm-white border-none rounded h-12 text-base mt-4">
                        Request Clarity Call
                      </Button>
                    </form>
                  </Form>
                )}
              </FadeIn>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
