import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const alertLoader = (message?: string): void => {

  const messageExist = message === undefined ? "Cargando, espere un momento." : message;
  
  MySwal.fire({
    allowOutsideClick: false,
    showConfirmButton: false,
    allowEscapeKey: false,
    width: 800,
    padding: '3em',
    background: 'rgb(0 0 123 / 0%)',
    backdrop: 'rgba(35,33,38,0.98) left top no-repeat',
    html: `
      <div class="container-loader">
        <div class="loader-timbox"></div>
        <div class="text-loader pt-3">${messageExist}</div>
      </div>
    `
  });
};

export const successAlert = (text: string): void => {
  MySwal.fire('¡Éxito!', text, 'success');
};

export const infoAlert = (message: string, text: string): void => {
  MySwal.fire(message, text, 'info');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const confirmationAlert = (message: string, messageConfirmation?: string): any => {
  return MySwal.fire({
    title: '¿Estás seguro?',
    text: `${message}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: messageConfirmation === undefined ? '¡Sí, borralo!' : messageConfirmation,
    cancelButtonText: 'Cancelar'
  });
};

export const closeAlert = (): void => {
  MySwal.close();
};