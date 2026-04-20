import React, { useState } from 'react';
import Header from '@/components/Header';
import ClothTable, { ClothItem } from '@/components/ClothTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Pencil, Trash2, Printer, Save, Truck, ArrowLeftRight } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

const ClothOutwards: React.FC = () => {
  const [formData, setFormData] = useState({
    dcNo: '',
    dcDate: new Date().toISOString().split('T')[0],
    rcNo: '',
    party: '',
    operator: '',
    machine: '',
    jCompacting: '',
    billingName: '',
    dayNight: 'Day',
    vehicleNo: '',
    driver: '',
    supervisor: '',
    orderNo: '',
    dyeingDcNo: '',
    dyeingName: '',
    partyDcNo: '',
    receivedKgs: '',
    deliveredTo: '',
    jCompactingDcNo: '',
    jDcDate: new Date().toISOString().split('T')[0],
    lotNo: '',
    buyer: '',
    dWeight: '',
    status: 'FULL',
    narration: '',
  });

  const [clothItems, setClothItems] = useState<ClothItem[]>([
    { id: 1, color: '', dia: '', fabric: '', gg: '', rolls: 0, totKgs: 0, remarks: '' },
  ]);
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitRecord = async () => {
    setSaving(true);
    try {
      await api.clothOutwards.create({ formData, items: clothItems });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Cloth Delivery saved successfully!');
      setFormData({
        dcNo: '', dcDate: new Date().toISOString().split('T')[0], rcNo: '', party: '', operator: '', machine: '',
        jCompacting: '', billingName: '', dayNight: 'Day', vehicleNo: '', driver: '', supervisor: '', orderNo: '',
        dyeingDcNo: '', dyeingName: '', partyDcNo: '', receivedKgs: '', deliveredTo: '', jCompactingDcNo: '',
        jDcDate: new Date().toISOString().split('T')[0], lotNo: '', buyer: '', dWeight: '', status: 'FULL', narration: '',
      });
      setClothItems([{ id: 1, color: '', dia: '', fabric: '', gg: '', rolls: 0, totKgs: 0, remarks: '' }]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to save record');
    } finally {
      setSaving(false);
    }
  };

  const handleProcess = () => void submitRecord();
  const handleSave = () => void submitRecord();
  const handlePrint = () => {
    window.print();
  };

  // Calculate process loss/gain
  const totalKgs = clothItems.reduce((sum, item) => sum + item.totKgs, 0);
  const receivedKgs = parseFloat(formData.receivedKgs) || 0;
  const processLossGain = receivedKgs > 0 ? ((receivedKgs - totalKgs) / receivedKgs * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <style>
        {`
          @media print {
            .no-print, 
            header, 
            nav, 
            button, 
            .action-buttons {
              display: none !important;
            }
            .form-card {
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            body {
              background: white !important;
            }
            .input-label {
              font-weight: bold;
            }
          }
        `}
      </style>
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="form-card animate-fade-in">
          {/* Title */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <div className="p-2 bg-secondary/20 rounded-lg">
              <Truck className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Cloth Delivery</h2>
              <p className="text-sm text-muted-foreground">Record outgoing cloth materials</p>
            </div>
          </div>

          {/* Form Fields - Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="input-label">D.C.No</label>
              <Input value={formData.dcNo} onChange={(e) => handleInputChange('dcNo', e.target.value)} />
            </div>
            <div>
              <label className="input-label">D.C.Date</label>
              <Input type="date" value={formData.dcDate} onChange={(e) => handleInputChange('dcDate', e.target.value)} />
            </div>
            <div>
              <label className="input-label">R.C.No</label>
              <Input value={formData.rcNo} onChange={(e) => handleInputChange('rcNo', e.target.value)} />
            </div>
            <div>
              <label className="input-label">Order No.</label>
              <Input value={formData.orderNo} onChange={(e) => handleInputChange('orderNo', e.target.value)} />
            </div>
            <div>
              <label className="input-label">Party</label>
              <Input value={formData.party} onChange={(e) => handleInputChange('party', e.target.value)} placeholder="Mohan Gudown" />
            </div>
            <div>
              <label className="input-label">Operator</label>
              <Input value={formData.operator} onChange={(e) => handleInputChange('operator', e.target.value)} />
            </div>
            <div>
              <label className="input-label">Machine</label>
              <Input value={formData.machine} onChange={(e) => handleInputChange('machine', e.target.value)} placeholder="FERRARO" />
            </div>
            <div>
              <label className="input-label">Day / Night</label>
              <Select value={formData.dayNight} onValueChange={(value) => handleInputChange('dayNight', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Day">Day</SelectItem>
                  <SelectItem value="Night">Night</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Form Fields - Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
            <div>
              <label className="input-label">J.Compacting</label>
              <Input value={formData.jCompacting} onChange={(e) => handleInputChange('jCompacting', e.target.value)} />
            </div>
            <div>
              <label className="input-label">J.Compacting D.C.No</label>
              <Input value={formData.jCompactingDcNo} onChange={(e) => handleInputChange('jCompactingDcNo', e.target.value)} />
            </div>
            <div>
              <label className="input-label">Billing Name</label>
              <Input value={formData.billingName} onChange={(e) => handleInputChange('billingName', e.target.value)} />
            </div>
            <div>
              <label className="input-label">Vehicle No.</label>
              <Input value={formData.vehicleNo} onChange={(e) => handleInputChange('vehicleNo', e.target.value)} />
            </div>
            <div>
              <label className="input-label">Driver</label>
              <Input value={formData.driver} onChange={(e) => handleInputChange('driver', e.target.value)} />
            </div>
            <div>
              <label className="input-label">Supervisor</label>
              <Input value={formData.supervisor} onChange={(e) => handleInputChange('supervisor', e.target.value)} />
            </div>
            <div>
              <label className="input-label">Lot No.</label>
              <Input value={formData.lotNo} onChange={(e) => handleInputChange('lotNo', e.target.value)} />
            </div>
            <div>
              <label className="input-label">Buyer</label>
              <Input value={formData.buyer} onChange={(e) => handleInputChange('buyer', e.target.value)} />
            </div>
          </div>

          {/* Form Fields - Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="input-label">Dyeing D.C.No</label>
              <Input value={formData.dyeingDcNo} onChange={(e) => handleInputChange('dyeingDcNo', e.target.value)} placeholder="384" />
            </div>
            <div>
              <label className="input-label">Dyeing Name</label>
              <Input value={formData.dyeingName} onChange={(e) => handleInputChange('dyeingName', e.target.value)} placeholder="Knit Tex Fabs" />
            </div>
            <div>
              <label className="input-label">Party D.C.No</label>
              <Input value={formData.partyDcNo} onChange={(e) => handleInputChange('partyDcNo', e.target.value)} placeholder="384" />
            </div>
            <div>
              <label className="input-label">Received Kgs</label>
              <Input value={formData.receivedKgs} onChange={(e) => handleInputChange('receivedKgs', e.target.value)} placeholder="545.7" />
            </div>
            <div>
              <label className="input-label">Delivered To</label>
              <Input value={formData.deliveredTo} onChange={(e) => handleInputChange('deliveredTo', e.target.value)} />
            </div>
            <div>
              <label className="input-label">D.Weight</label>
              <Input value={formData.dWeight} onChange={(e) => handleInputChange('dWeight', e.target.value)} placeholder="0" />
            </div>
            <div>
              <label className="input-label">J.D.C.Date</label>
              <Input type="date" value={formData.jDcDate} onChange={(e) => handleInputChange('jDcDate', e.target.value)} />
            </div>
            <div>
              <label className="input-label">Status</label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FULL">FULL</SelectItem>
                  <SelectItem value="PARTIAL">PARTIAL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Process Button */}
          <div className="flex justify-end mb-6">
            <Button onClick={handleProcess} className="gap-2" disabled={saving}>
              <Save className="w-4 h-4" />
              {saving ? 'Saving…' : 'PROCESS'}
            </Button>
          </div>

          {/* Cloth Items Table */}
          <ClothTable items={clothItems} onItemsChange={setClothItems} />

          {/* Process Loss/Gain */}
          <div className="mt-4 p-4 bg-muted/50 rounded-lg flex items-center gap-4">
            <ArrowLeftRight className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">Process Loss Or Gain (Kgs):</span>
            <span className={`font-bold ${processLossGain >= 0 ? 'text-success' : 'text-destructive'}`}>
              {processLossGain.toFixed(3)} %
            </span>
          </div>

          {/* Narration */}
          <div className="mt-6">
            <label className="input-label">Narration</label>
            <Textarea 
              value={formData.narration} 
              onChange={(e) => handleInputChange('narration', e.target.value)}
              placeholder="Additional notes..."
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
            <Button variant="outline" className="gap-2">
              <Search className="w-4 h-4" />
              Search
            </Button>
            <Button variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              Add
            </Button>
            <Button variant="outline" className="gap-2">
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
            <Button variant="outline" className="gap-2 text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
            <Button variant="outline" className="gap-2" onClick={handlePrint}>
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button onClick={handleSave} className="gap-2 ml-auto" disabled={saving}>
              <Save className="w-4 h-4" />
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClothOutwards;
