import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface ClothItem {
  id: number;
  color: string;
  dia: string;
  fabric: string;
  gg: string;
  rolls: number;
  totKgs: number;
  remarks: string;
}

interface ClothTableProps {
  items: ClothItem[];
  onItemsChange: (items: ClothItem[]) => void;
}

const colorOptions = [
  'White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Grey', 'Navy', 'Maroon', 'Orange', 'Pink', 'Purple',
  'Royal Blue', 'Sky Blue', 'Light Grey', 'Dark Grey', 'Cream', 'Beige', 'Brown', 'Olive', 'Teal', 'Magenta',
];

const fabricOptions = [
  'Cotton', 'Polyester', 'Nylon', 'Silk', 'Wool', 'Linen', 'Spandex', 'Viscose', 'Acrylic', 'Rayon',
  'Jersey', 'Interlock', 'Rib', 'Pique', 'Fleece', 'Terry', 'Suede', 'Velvet', 'Denim', 'Canvas',
  'Airtex', 'Double Jersey', 'Single Jersey', 'Jacquard', 'Mesh', 'Taffeta', 'Chiffon', 'Georgette',
];

const ClothTable: React.FC<ClothTableProps> = ({ items, onItemsChange }) => {
  const addRow = () => {
    const newItem: ClothItem = {
      id: items.length + 1,
      color: '',
      dia: '',
      fabric: '',
      gg: '',
      rolls: 0,
      totKgs: 0,
      remarks: '',
    };
    onItemsChange([...items, newItem]);
  };

  const removeRow = (id: number) => {
    onItemsChange(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: number, field: keyof ClothItem, value: string | number) => {
    onItemsChange(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const totalRolls = items.reduce((sum, item) => sum + (item.rolls || 0), 0);
  const totalKgs = items.reduce((sum, item) => sum + (item.totKgs || 0), 0);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header-cell w-12">#</th>
              <th className="table-header-cell">Color</th>
              <th className="table-header-cell w-20">Dia</th>
              <th className="table-header-cell">Fabric</th>
              <th className="table-header-cell w-20">GG</th>
              <th className="table-header-cell w-24">Rolls</th>
              <th className="table-header-cell w-28">Tot.Kgs</th>
              <th className="table-header-cell">Remarks</th>
              <th className="table-header-cell w-16"></th>
            </tr>
          </thead>
          <tbody className="bg-card">
            {items.map((item, index) => (
              <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                <td className="table-body-cell text-center font-medium">{index + 1}</td>
                <td className="table-body-cell">
                  <Select
                    value={item.color}
                    onValueChange={(value) => updateItem(item.id, 'color', value)}
                  >
                    <SelectTrigger className="h-9 w-full">
                      <SelectValue placeholder="Select Color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((color) => (
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="table-body-cell">
                  <Input
                    value={item.dia}
                    onChange={(e) => updateItem(item.id, 'dia', e.target.value)}
                    className="h-9"
                    placeholder="20"
                  />
                </td>
                <td className="table-body-cell">
                  <Select
                    value={item.fabric}
                    onValueChange={(value) => updateItem(item.id, 'fabric', value)}
                  >
                    <SelectTrigger className="h-9 w-full">
                      <SelectValue placeholder="Select Fabric" />
                    </SelectTrigger>
                    <SelectContent>
                      {fabricOptions.map((fabric) => (
                        <SelectItem key={fabric} value={fabric}>{fabric}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="table-body-cell">
                  <Input
                    value={item.gg}
                    onChange={(e) => updateItem(item.id, 'gg', e.target.value)}
                    className="h-9"
                  />
                </td>
                <td className="table-body-cell">
                  <Input
                    type="number"
                    value={item.rolls || ''}
                    onChange={(e) => updateItem(item.id, 'rolls', parseInt(e.target.value) || 0)}
                    className="h-9"
                    placeholder="0"
                  />
                </td>
                <td className="table-body-cell">
                  <Input
                    type="number"
                    step="0.001"
                    value={item.totKgs || ''}
                    onChange={(e) => updateItem(item.id, 'totKgs', parseFloat(e.target.value) || 0)}
                    className="h-9"
                    placeholder="0.000"
                  />
                </td>
                <td className="table-body-cell">
                  <Input
                    value={item.remarks}
                    onChange={(e) => updateItem(item.id, 'remarks', e.target.value)}
                    className="h-9"
                  />
                </td>
                <td className="table-body-cell text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRow(item.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-muted/50 font-semibold">
              <td colSpan={5} className="px-4 py-3 text-right">Total:</td>
              <td className="px-4 py-3">{totalRolls}</td>
              <td className="px-4 py-3">{totalKgs.toFixed(3)}</td>
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <Button onClick={addRow} variant="outline" className="gap-2">
        <Plus className="w-4 h-4" />
        Add Row
      </Button>
    </div>
  );
};

export default ClothTable;
