'use client';

import { useState } from 'react';
import { Calendar, Filter, Search } from 'lucide-react';

interface AvailabilityFilterProps {
  onFilterChange: (startDate: string, endDate: string) => void;
  isLoading?: boolean;
  tenantBrandColor?: string;
}

export function AvailabilityFilter({ 
  onFilterChange, 
  isLoading = false,
  tenantBrandColor = '#3B82F6'
}: AvailabilityFilterProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = () => {
    onFilterChange(startDate, endDate);
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    onFilterChange('', '');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
          <Filter className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Filtrer par disponibilité
          </h3>
          <p className="text-sm text-gray-600">
            Sélectionnez vos dates pour voir les véhicules disponibles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* Start Date */}
        <div className="relative">
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-2">
            Date de début
          </label>
          <div className="relative">
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={today}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* End Date */}
        <div className="relative">
          <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-2">
            Date de fin
          </label>
          <div className="relative">
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || today}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSearch}
            disabled={isLoading}
            style={{ backgroundColor: tenantBrandColor }}
            className="flex-1 px-6 py-3 text-white font-medium rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Recherche...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Rechercher
              </>
            )}
          </button>
          
          <button
            onClick={handleClear}
            disabled={isLoading}
            className="px-4 py-3 text-gray-600 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Effacer
          </button>
        </div>
      </div>

      {(startDate || endDate) && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            {startDate && endDate ? (
              <>
                Affichage des véhicules disponibles du{' '}
                <span className="font-semibold">
                  {new Date(startDate).toLocaleDateString('fr-FR')}
                </span>
                {' '}au{' '}
                <span className="font-semibold">
                  {new Date(endDate).toLocaleDateString('fr-FR')}
                </span>
              </>
            ) : startDate ? (
              <>
                Affichage des véhicules disponibles à partir du{' '}
                <span className="font-semibold">
                  {new Date(startDate).toLocaleDateString('fr-FR')}
                </span>
              </>
            ) : endDate ? (
              <>
                Affichage des véhicules disponibles jusqu'au{' '}
                <span className="font-semibold">
                  {new Date(endDate).toLocaleDateString('fr-FR')}
                </span>
              </>
            ) : null}
          </p>
        </div>
      )}
    </div>
  );
}