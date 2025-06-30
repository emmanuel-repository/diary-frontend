import { useState, useRef, ChangeEvent } from 'react';
import { FiCamera, FiX } from 'react-icons/fi';

interface ProfileImageUploadProps {
  initialImage?: string;
  onImageChange: (file: File | null) => void;
  size?: 'sm' | 'md' | 'lg';
}

const ProfileImageUpload = ({ initialImage = '', onImageChange, size = 'md' }: ProfileImageUploadProps) => {

  const [previewImage, setPreviewImage] = useState<string>(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40'
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
   
    const file = e.target.files?.[0];
   
    if (!file) return;

    const maxSize = 50 * 1024 * 1024; // 2MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!allowedTypes.includes(file.type)) {
      alert('Solo se permiten imágenes JPG o PNG');
      fileInputRef.current!.value = '';
      return;
    }

    if (file.size > maxSize) {
      alert('La imagen no debe superar los 2MB');
      fileInputRef.current!.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
      onImageChange(file);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewImage('');
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Foto de perfil</h2>
      <div className="flex flex-col items-center space-y-4">
        <div className={`relative rounded-full ${sizeClasses[size]} bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300`}>
          {previewImage ? (
            <>
              <img
                src={previewImage}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="p-2 rounded-full bg-white bg-opacity-80 text-gray-800 hover:bg-opacity-100"
                >
                  <FiCamera size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <FiCamera size={32} />
              <span className="text-sm mt-2">Subir foto</span>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={triggerFileInput}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            {previewImage ? 'Cambiar foto' : 'Subir foto'}
          </button>

          {previewImage && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm flex items-center"
            >
              <FiX className="mr-1" /> Eliminar
            </button>
          )}
        </div>

        <p className="text-xs text-gray-500 text-center">
          Formatos admitidos: JPG, PNG (Máx. 2MB)
        </p>
      </div>
    </div>
  );
};

export default ProfileImageUpload;