import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Truck, TrendingUp, Scale, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import textileBackground from '@/assets/textile-background.jpg';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => api.dashboard.getStats(),
  });

  const stats = [
    { title: 'Today\'s Inwards', value: statsData?.todayInwards ?? '–', subtitle: 'Entries', icon: Package, color: 'primary' as const },
    { title: 'Today\'s Outwards', value: statsData?.todayOutwards ?? '–', subtitle: 'Deliveries', icon: Truck, color: 'secondary' as const },
    { title: 'Total Inwards', value: statsData?.totalInwards ?? '–', subtitle: 'All time', icon: Package, color: 'primary' as const },
    { title: 'Total Outwards', value: statsData?.totalOutwards ?? '–', subtitle: 'All time', icon: Truck, color: 'secondary' as const },
    { title: 'Total Stock', value: statsData != null ? statsData.totalStockKgs.toLocaleString('en-IN', { maximumFractionDigits: 3 }) : '–', subtitle: 'Kgs', icon: Scale, color: 'primary' as const },
    { title: 'Monthly Growth', value: statsData != null ? `${statsData.monthlyGrowthPercent >= 0 ? '+' : ''}${statsData.monthlyGrowthPercent}%` : '–', subtitle: 'vs last month', icon: TrendingUp, color: 'secondary' as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div 
          className="relative h-64 md:h-80 flex items-center justify-center"
          style={{
            backgroundImage: `url(${textileBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="relative z-10 text-center text-card px-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Welcome to SRI RAM</h1>
            <p className="text-lg md:text-xl opacity-90">Knit Compacting & Steam Calenderings</p>
            <p className="text-sm opacity-75 mt-2">Tirupur - 641 603</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-4 -mt-12 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="shadow-elegant animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-3xl font-bold mt-1">{isLoading ? '…' : stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.color === 'primary' ? 'bg-primary/10' : 'bg-secondary/20'}`}>
                        <Icon className={`w-6 h-6 ${stat.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="font-display text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-elegant transition-shadow cursor-pointer group" onClick={() => navigate('/cloth-inwards')}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Package className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Cloth Inwards</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">Record incoming materials</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow cursor-pointer group" onClick={() => navigate('/cloth-outwards')}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary/20 rounded-xl">
                      <Truck className="w-8 h-8 text-secondary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Cloth Outwards</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">Manage deliveries</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
