import React, { useState } from 'react';
import Header from '@/components/Header';
import ClothTable, { ClothItem } from '@/components/ClothTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Pencil, Trash2, Printer, Save, Package } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

const ClothInwards: React.FC = () => {
  const [formData, setFormData] = useState({
    bcNo: '',
    bcDate: new Date().toISOString().split('T')[0],
    party: '',
    orderNo: '',
    buyer: '',
    operator: '',
    dayNight: 'Day',
    supervisor: '',
    lotNo: '',
    dyeingDcNo: '',
    dyeingName: '',
    partyDcNo: '',
    pDcWeight: '',
    vehicleNo: '',
    driver: '',
    team: '',
    date: new Date().toISOString().split('T')[0],
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
      await api.clothInwards.create({ formData: { ...formData, date: formData.bcDate }, items: clothItems });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Cloth Inward saved successfully!');
      setFormData({
        bcNo: '', bcDate: new Date().toISOString().split('T')[0], party: '', orderNo: '', buyer: '', operator: '',
        dayNight: 'Day', supervisor: '', lotNo: '', dyeingDcNo: '', dyeingName: '', partyDcNo: '', pDcWeight: '',
        vehicleNo: '', driver: '', team: '', date: new Date().toISOString().split('T')[0], narration: '',
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="form-card animate-fade-in">
          {/* Title */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Cloth Inward</h2>
              <p className="text-sm text-muted-foreground">Record incoming cloth materials</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="input-label">B.C.No</label>
              <Input value={formData.bcNo} onChange={(e) => handleInputChange('bcNo', e.target.value)} />
            </div>
            <div>
              <label className="input-label">B.C.Date</label>
              <Input type="date" value={formData.bcDate} onChange={(e) => handleInputChange('bcDate', e.target.value)} />
            </div>
            <div>
              <label className="input-label">Party</label>
              <Input value={formData.party} onChange={(e) => handleInputChange('party', e.target.value)} placeholder="Mohan Gudown" />
            </div>
            <div>
              <label className="input-label">Order No.</label>
              <Input value={formData.orderNo} onChange={(e) => handleInputChange('orderNo', e.target.value)} />
            </div>
            <div>
              <label className="input-label">Buyer</label>
              <Input value={formData.buyer} onChange={(e) => handleInputChange('buyer', e.target.value)} />
            </div>
            <div>
              <label className="input-label">Operator</label>
              <Input value={formData.operator} onChange={(e) => handleInputChange('operator', e.target.value)} />
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
            <div>
              <label className="input-label">Supervisor</label>
              <Input value={formData.supervisor} onChange={(e) => handleInputChange('supervisor', e.target.value)} />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
            <div>
              <label className="input-label">Lot No.</label>
              <Input value={formData.lotNo} onChange={(e) => handleInputChange('lotNo', e.target.value)} />
            </div>
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
              <label className="input-label">P. D.C.Weight</label>
              <Input value={formData.pDcWeight} onChange={(e) => handleInputChange('pDcWeight', e.target.value)} placeholder="545.7" />
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
              <label className="input-label">Team</label>
              <Input value={formData.team} onChange={(e) => handleInputChange('team', e.target.value)} />
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
            <Button variant="outline" className="gap-2">
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

export default ClothInwards;
