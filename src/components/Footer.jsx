"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-card text-muted-foreground font-sans border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          
          {/* Column 1: Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/coaching" className="hover:text-foreground transition-colors">1on1 Coaching</Link></li>
              <li><Link href="/company-review" className="hover:text-foreground transition-colors">Company Review</Link></li>
              <li><Link href="/accounts-review" className="hover:text-foreground transition-colors">Accounts Review</Link></li>
              <li><Link href="/hr-consulting" className="hover:text-foreground transition-colors">HR Consulting</Link></li>
              <li><Link href="/seo" className="hover:text-foreground transition-colors">SEO Optimisation</Link></li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/team" className="hover:text-foreground transition-colors">Meet the Team</Link></li>
              <li><Link href="/accounts" className="hover:text-foreground transition-colors">Accounts Review</Link></li>
            </ul>
          </div>

          {/* Column 3: Helpful Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Helpful Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/faqs" className="hover:text-foreground transition-colors">FAQs</Link></li>
              <li><Link href="/chat" className="hover:text-foreground transition-colors">Live Chat</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/accessibility" className="hover:text-foreground transition-colors">Accessibility</Link></li>
              <li><Link href="/returns" className="hover:text-foreground transition-colors">Returns Policy</Link></li>
              <li><Link href="/refund" className="hover:text-foreground transition-colors">Refund Policy</Link></li>
              <li><Link href="/hiring" className="hover:text-foreground transition-colors">Hiring-3 Statistics</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2022. Company Name. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;