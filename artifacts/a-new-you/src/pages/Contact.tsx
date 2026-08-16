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
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Please share a brief message about what brings you here'),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '', message: '' },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
    setIsSubmitted(true);
  }

  return (
    <Layout>

      {/* ── HERO + FORM — split aubergine / porcelain ─────────────────────── */}
      <section className="relative flex flex-col lg:flex-row -mt-20 min-h-[calc(100vh-0px)]">

        {/* Left — aubergine editorial panel */}
        <div className="bg-aubergine lg:w-[45%] flex items-start order-2 lg:order-1">
          <div className="px-8 sm:px-12 lg:px-16 xl:px-20 pt-28 pb-20 lg:pt-40 lg:pb-32 w-full">
            <FadeIn>
              <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-8 block">
                Contact
              </span>
              <h1 className="font-serif italic text-warm-white text-[2.4rem] sm:text-[3rem] lg:text-[3.5rem] leading-[1.08] mb-10">
                Start with a private conversation.
              </h1>
              <p className="text-warm-white/70 text-lg leading-relaxed mb-14">
                Begin with a complimentary 20-minute Clarity Call to discuss where you are and what support may fit.
              </p>

              <div className="space-y-10">
                <div>
                  <div className="w-8 h-px bg-champagne/40 mb-8" />
                  <h3 className="font-serif text-xl text-champagne mb-3">What happens next</h3>
                  <p className="text-warm-white/65 leading-relaxed text-sm">
                    After submitting the form, Christine will be in touch via email to arrange a suitable time for your call.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-champagne mb-3">Direct Contact</h3>
                  <p className="text-warm-white/65 leading-relaxed text-sm">
                    <a href="tel:0409140173" className="hover:text-champagne transition-colors underline underline-offset-2">0409 140 173</a><br />
                    <a href="mailto:hello@anewyou.com.au" className="hover:text-champagne transition-colors underline underline-offset-2">hello@anewyou.com.au</a>
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-champagne mb-3">Locations</h3>
                  <p className="text-warm-white/65 leading-relaxed text-sm">
                    In person: Melbourne, VIC<br />
                    Online: Australia-wide via Zoom
                  </p>
                </div>
              </div>

              <p className="text-warm-white/50 text-xs mt-14">
                All enquiries are treated with the strictest confidence.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Right — form */}
        <div className="bg-porcelain lg:w-[55%] flex items-center order-1 lg:order-2">
          <div className="px-8 sm:px-12 lg:px-16 xl:px-20 pt-28 pb-20 lg:pt-40 lg:pb-32 w-full max-w-2xl">
            <FadeIn delay={0.15}>
              {isSubmitted ? (
                <div className="text-center py-16">
                  <CheckCircle2 className="w-16 h-16 text-champagne mx-auto mb-6" aria-hidden="true" />
                  <h2 className="font-serif italic text-aubergine text-4xl mb-4">Request Received</h2>
                  <p className="text-charcoal leading-relaxed mb-10">
                    Thank you for reaching out. Christine will be in touch shortly to arrange your Clarity Call.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                    className="border-aubergine/40 text-aubergine hover:bg-aubergine/5 rounded-none text-xs font-semibold tracking-[0.15em] uppercase"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-4 block">
                      Clarity Call Request
                    </span>
                    <h2 className="font-serif italic text-aubergine text-3xl md:text-4xl leading-tight">
                      Tell Christine a little about yourself.
                    </h2>
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-charcoal font-medium">First name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="First name"
                                  {...field}
                                  className="bg-warm-white border-aubergine/50 focus-visible:ring-aubergine rounded-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-charcoal font-medium">Last name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Last name"
                                  {...field}
                                  className="bg-warm-white border-aubergine/50 focus-visible:ring-aubergine rounded-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-charcoal font-medium">Email address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Your email address"
                                {...field}
                                className="bg-warm-white border-aubergine/50 focus-visible:ring-aubergine rounded-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-charcoal font-medium">
                              Phone number <span className="font-normal text-charcoal/70">(optional)</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="Your phone number"
                                {...field}
                                className="bg-warm-white border-aubergine/50 focus-visible:ring-aubergine rounded-none"
                              />
                            </FormControl>
                            <FormMessage />
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
                                className="min-h-[130px] bg-warm-white border-aubergine/50 focus-visible:ring-aubergine rounded-none resize-y"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-xs font-bold tracking-[0.2em] uppercase h-14 mt-2"
                      >
                        Request Clarity Call
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </FadeIn>
          </div>
        </div>

      </section>
    </Layout>
  );
}
