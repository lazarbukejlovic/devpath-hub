UPDATE storage.buckets SET public = true WHERE id = 'founder-assets';

CREATE POLICY "Public read founder-assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'founder-assets');