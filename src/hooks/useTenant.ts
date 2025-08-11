import { useState, useEffect, useCallback } from 'react';
import { tenantService } from '@/services/tenant.service';
import { TenantSettings, TenantBasic } from '@/types/tenant.types';

export const useTenantSettings = (slug: string) => {
  const [tenant, setTenant] = useState<TenantSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTenant = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const tenantData = await tenantService.getTenantSettings(slug);
      setTenant(tenantData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tenant');
    } finally {
      setLoading(false);
    }
  }, [slug]); // <-- 'slug' is a dependency for useCallback

  useEffect(() => {
    if (slug) {
      fetchTenant();
    }
  }, [fetchTenant, slug]); // <-- 'fetchTenant' is a dependency for useEffect

  return { tenant, loading, error, refetch: fetchTenant };
};

// ----------------------------------------------------------------

export const useTenantBasic = (slug: string) => {
  const [tenant, setTenant] = useState<TenantBasic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTenant = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const tenantData = await tenantService.getTenantBasic(slug);
      setTenant(tenantData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tenant');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      fetchTenant();
    }
  }, [fetchTenant, slug]);

  return { tenant, loading, error, refetch: fetchTenant };
};