import { X, Trash2, ShoppingBag, Check } from 'lucide-react';
import { Link } from 'wouter';
import { useCart, type PaymentType } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

function fmt(n: number) {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(n);
}

export function CartDrawer() {
  const { program, removeProgram, updatePaymentType, isOpen, closeCart } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const periodAbbr = program?.planPeriod === 'week' ? 'wk' : 'mo';

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Your program selection"
        className="fixed top-0 right-0 bottom-0 w-full max-w-[420px] bg-porcelain z-[70] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-blush">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-4 h-4 text-aubergine" />
            <span className="font-serif text-lg text-aubergine">Your selection</span>
          </div>
          <button
            onClick={closeCart}
            className="text-charcoal/50 hover:text-aubergine transition-colors p-1 -mr-1"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {!program ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-10 h-10 text-aubergine/20 mx-auto mb-4" />
              <p className="text-charcoal/50 text-sm mb-6">No program selected yet.</p>
              <button
                onClick={closeCart}
                className="text-xs font-semibold tracking-[0.15em] uppercase text-aubergine hover:text-plum transition-colors"
              >
                Browse programs →
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Program card */}
              <div className="bg-aubergine">
                <div className="px-6 pt-6 pb-4">
                  <span className="text-champagne text-[10px] font-semibold tracking-[0.3em] uppercase block mb-2">
                    {program.duration}
                  </span>
                  <h3 className="font-serif italic text-warm-white text-xl leading-tight">
                    {program.name}
                  </h3>
                </div>

                {/* Payment toggle */}
                <div className="border-t border-white/10 px-6 py-5">
                  <p className="text-warm-white/50 text-[10px] font-semibold tracking-[0.2em] uppercase mb-3">
                    Payment option
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {(['full', 'plan'] as PaymentType[]).map((type) => {
                      const active = program.paymentType === type;
                      return (
                        <button
                          key={type}
                          onClick={() => updatePaymentType(type)}
                          className={`px-4 py-3 text-left transition-all flex items-start gap-2 ${
                            active
                              ? 'bg-champagne text-aubergine'
                              : 'bg-white/8 text-warm-white/70 hover:bg-white/15'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${active ? 'border-aubergine bg-aubergine' : 'border-warm-white/40'}`}>
                            {active && <Check className="w-2 h-2 text-champagne" />}
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-widest opacity-70 mb-0.5">
                              {type === 'full' ? 'Pay in full' : 'Payment plan'}
                            </div>
                            <div className="text-sm font-semibold">
                              {type === 'full'
                                ? fmt(program.fullPrice)
                                : `${fmt(program.planAmount)}/${periodAbbr}`}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {program.paymentType === 'plan' && (
                    <p className="text-warm-white/40 text-xs mt-3 leading-relaxed">
                      {program.planCount} payments of {fmt(program.planAmount)}. Total payable: {fmt(program.planTotal)}.
                      Payment-plan total is higher than the pay-in-full rate.
                    </p>
                  )}
                  {program.paymentType === 'full' && (
                    <p className="text-warm-white/40 text-xs mt-3 leading-relaxed">
                      Pay in full and save {fmt(program.planTotal - program.fullPrice)} compared with the payment plan.
                    </p>
                  )}
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={removeProgram}
                className="flex items-center gap-2 text-xs text-charcoal/40 hover:text-aubergine transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove selection
              </button>

              {/* Legal note */}
              <div className="border-t border-blush pt-6">
                <p className="text-xs text-charcoal/40 leading-relaxed">
                  All prices AUD. Professional-development expenses may be deductible depending on your circumstances — please seek advice from your accountant.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        {program && (
          <div className="border-t border-blush px-8 py-6 bg-porcelain">
            <div className="flex items-baseline justify-between mb-5">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-charcoal/50">
                {program.paymentType === 'full' ? 'Investment' : 'First payment'}
              </span>
              <span className="font-serif italic text-2xl text-aubergine">
                {program.paymentType === 'full'
                  ? fmt(program.fullPrice)
                  : fmt(program.planAmount)}
              </span>
            </div>
            <Link href="/contact" onClick={closeCart}>
              <Button className="w-full bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-xs font-bold tracking-[0.2em] uppercase h-13 mb-3">
                Proceed to Application
              </Button>
            </Link>
            <p className="text-[11px] text-charcoal/40 text-center leading-relaxed">
              Your application is confidential. Christine reviews every application personally.
              Applying does not commit you to purchase.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
