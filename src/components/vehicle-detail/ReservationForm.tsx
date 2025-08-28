'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, AlertCircle, Loader2, Calendar, Phone, User, MessageSquare, CreditCard } from 'lucide-react';
import { ReservationFormProps } from '@/types/reservation.types';
import { BookingResponse } from '@/types/reservation.types';

export function ReservationForm({ 
  tenantBrandColor, 
  dailyRate, 
  vehicleId, 
  tenantId, 
  baseUrl = 'http://srv673142.hstgr.cloud' 
}: ReservationFormProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerType, setCustomerType] = useState<'person' | 'company'>('person');
  const [customerNotes, setCustomerNotes] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [successMessage, setSuccessMessage] = useState('');

  // Get today's date in YYYY-MM-DD format for min date validation
  const today = new Date().toISOString().split('T')[0];

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.requested_start_date;
      delete newErrors.requested_end_date;
      return newErrors;
    });

    if (start && end) {
      const date1 = new Date(start);
      const date2 = new Date(end);
      const timeDiff = date2.getTime() - date1.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      if (dayDiff > 0) {
        setTotalPrice(dayDiff * dailyRate);
        setTotalDays(dayDiff);
      } else {
        setTotalPrice(0);
        setTotalDays(0);
      }
    } else {
      setTotalPrice(0);
      setTotalDays(0);
    }
  };

  const clearErrors = (fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    // Client-side validation
    const newErrors: Record<string, string[]> = {};
    
    if (!startDate) newErrors.requested_start_date = ['La date de début est requise.'];
    if (!endDate) newErrors.requested_end_date = ['La date de fin est requise.'];
    if (!customerName.trim()) newErrors.customer_name = ['Le nom du client est requis.'];
    if (!customerPhone.trim()) newErrors.customer_phone = ['Le numéro de téléphone est requis.'];

    if (startDate && new Date(startDate) < new Date(today)) {
      newErrors.requested_start_date = ['La date de début ne peut pas être dans le passé.'];
    }

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      newErrors.requested_end_date = ['La date de fin doit être après la date de début.'];
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const requestBody = {
        tenant_id: tenantId,
        vehicle_id: vehicleId,
        customer_name: customerName.trim(),
        customer_phone: customerPhone.trim(),
        customer_type: customerType,
        requested_start_date: startDate,
        requested_end_date: endDate,
        customer_notes: customerNotes.trim() || undefined,
      };
      console.log("request body", requestBody);
      const response = await fetch(`${baseUrl}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data: BookingResponse = await response.json();

      if (data.success) {
        setSuccessMessage(data.message);
        // Reset form on success
        setStartDate('');
        setEndDate('');
        setCustomerName('');
        setCustomerPhone('');
        setCustomerType('person');
        setCustomerNotes('');
        setTotalPrice(0);
        setTotalDays(0);
      } else {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: [data.message || 'Une erreur est survenue.'] });
        }
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setErrors({ 
        general: ['Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.'] 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold">Réserver ce véhicule</CardTitle>
        <CardDescription className="text-base">
          Remplissez le formulaire pour soumettre votre demande de réservation
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Success Message */}
          {successMessage && (
            <Alert className="border-green-200 bg-green-50/80 backdrop-blur-sm">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800 font-medium">
                {successMessage}
              </AlertDescription>
            </Alert>
          )}

          {/* General Error Messages */}
          {errors.general && (
            <Alert variant="destructive" className="bg-red-50/80 backdrop-blur-sm">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription>
                {errors.general.map((error, index) => (
                  <div key={index} className="font-medium">{error}</div>
                ))}
              </AlertDescription>
            </Alert>
          )}

          {/* Customer Information Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-slate-600" />
              <h3 className="text-lg font-semibold">Informations personnelles</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="customer-name" className="text-sm font-medium">
                  Nom complet <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="customer-name"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    clearErrors('customer_name');
                  }}
                  placeholder="Ex: SALIMI Mohamed"
                  className={`h-11 ${errors.customer_name ? 'border-red-300 focus-visible:ring-red-500' : 'focus-visible:ring-slate-400'}`}
                />
                {errors.customer_name && (
                  <p className="text-sm text-red-600 font-medium">{errors.customer_name[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer-phone" className="text-sm font-medium">
                  Numéro de téléphone <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    id="customer-phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => {
                      setCustomerPhone(e.target.value);
                      clearErrors('customer_phone');
                    }}
                    placeholder="Ex: 0555 123 456"
                    className={`h-11 pl-10 ${errors.customer_phone ? 'border-red-300 focus-visible:ring-red-500' : 'focus-visible:ring-slate-400'}`}
                  />
                </div>
                {errors.customer_phone && (
                  <p className="text-sm text-red-600 font-medium">{errors.customer_phone[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer-type" className="text-sm font-medium">
                  Type de client <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={customerType} 
                  onValueChange={(value: 'person' | 'company') => {
                    setCustomerType(value);
                    clearErrors('customer_type');
                  }}
                >
                  <SelectTrigger className={`h-11 ${errors.customer_type ? 'border-red-300 focus:ring-red-500' : 'focus:ring-slate-400'}`}>
                    <SelectValue placeholder="Sélectionnez le type de client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="person">Particulier</SelectItem>
                    <SelectItem value="company">Entreprise</SelectItem>
                  </SelectContent>
                </Select>
                {errors.customer_type && (
                  <p className="text-sm text-red-600 font-medium">{errors.customer_type[0]}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Date Selection Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-slate-600" />
              <h3 className="text-lg font-semibold">Période de location</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-sm font-medium">
                  Date de début <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  min={today}
                  onChange={(e) => handleDateChange(e.target.value, endDate)}
                  className={`h-11 ${errors.requested_start_date ? 'border-red-300 focus-visible:ring-red-500' : 'focus-visible:ring-slate-400'}`}
                />
                {errors.requested_start_date && (
                  <p className="text-sm text-red-600 font-medium">{errors.requested_start_date[0]}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-sm font-medium">
                  Date de fin <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  min={startDate || today}
                  onChange={(e) => handleDateChange(startDate, e.target.value)}
                  className={`h-11 ${errors.requested_end_date ? 'border-red-300 focus-visible:ring-red-500' : 'focus-visible:ring-slate-400'}`}
                />
                {errors.requested_end_date && (
                  <p className="text-sm text-red-600 font-medium">{errors.requested_end_date[0]}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Notes Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-slate-600" />
              <h3 className="text-lg font-semibold">Notes supplémentaires</h3>
            </div>
            <div className="space-y-2">
              <Textarea
                id="customer-notes"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="Toute demande spéciale ou information supplémentaire..."
                className="min-h-[100px] focus-visible:ring-slate-400"
              />
              <p className="text-sm text-slate-500">
                Optionnel - Ajoutez toute information utile pour votre réservation
              </p>
            </div>
          </div>
          
          {/* Price Summary */}
          {totalPrice > 0 && (
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="h-5 w-5 text-slate-600" />
                <h3 className="text-lg font-semibold">Résumé de la réservation</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Durée de location</span>
                  <Badge variant="secondary" className="bg-white">
                    {totalDays} jour{totalDays > 1 ? 's' : ''}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Tarif journalier</span>
                  <span className="font-semibold">
                    {new Intl.NumberFormat('fr-DZ').format(dailyRate)} DA
                  </span>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-slate-900">Total estimé</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: tenantBrandColor }}>
                      {new Intl.NumberFormat('fr-DZ').format(totalPrice)} DA
                    </div>
                    <p className="text-xs text-slate-500">
                      {new Intl.NumberFormat('fr-DZ').format(dailyRate)} DA × {totalDays} jour{totalDays > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
            style={{ backgroundColor: tenantBrandColor }}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              'Envoyer la demande de réservation'
            )}
          </Button>
          
          <p className="text-xs text-slate-500 text-center mt-4">
            En soumettant cette demande, vous acceptez d'être contacté pour finaliser votre réservation.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}