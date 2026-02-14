import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MapPin, User, Clock, Wrench } from 'lucide-react';
import textileBackground from '@/assets/textile-background.jpg';
import logo from '@/assets/logo.png';

const CompanyInfo: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div 
          className="relative h-72 flex items-center justify-center"
          style={{
            backgroundImage: `url(${textileBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative z-10 text-center text-card px-4">
            <div className="inline-flex items-center justify-center bg-card/90 backdrop-blur rounded-xl p-4 mb-4">
              <img src={logo} alt="Sri Ram Knit Compacting" className="h-16 w-auto" />
            </div>
            <p className="text-xl md:text-2xl font-semibold text-secondary">
              STEAM CALENDERINGS
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Contact Person */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <User className="w-5 h-5 text-primary" />
                  Contact Person
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">V. Sampath</p>
                <p className="text-sm text-muted-foreground mt-1">Proprietor</p>
              </CardContent>
            </Card>

            {/* Phone Numbers */}
            <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Phone className="w-5 h-5 text-primary" />
                  Contact Numbers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-xl font-semibold">94422 87030</p>
                  <p className="text-xl font-semibold">88383 00462</p>
                </div>
              </CardContent>
            </Card>

            {/* Address */}
            <Card className="md:col-span-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">
                  Muthanna Chettiar Kalayana Mandapam Street,<br />
                  Pudhu Thottam, Avinashi Road,<br />
                  Gandhi Nagar (Po),<br />
                  <span className="font-bold">TIRUPUR - 641 603</span>
                </p>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Wrench className="w-5 h-5 text-primary" />
                  Our Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    Knit Compacting
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    Steam Calendering
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    Fabric Processing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    Quality Finishing
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Clock className="w-5 h-5 text-primary" />
                  Working Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Saturday</span>
                    <span className="font-semibold">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blessing */}
          <div className="mt-12 text-center">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider">
              Sri Kariyakaliamman Thunai
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyInfo;
