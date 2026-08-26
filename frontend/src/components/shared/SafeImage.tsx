import { useState } from 'react';
import { Package } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
}

export default function SafeImage({
  fallbackText = 'Sin Fotografía',
  alt,
  className,
  src,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className="flex flex-col items-center justify-center text-slate-400 gap-1.5 p-4 text-center h-full w-full">
        <Package className="h-6 w-6 text-slate-300" />
        <span className="text-[11px] font-semibold">{fallbackText}</span>
      </div>
    );
  }

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}