import Swal from "sweetalert2";

export const sweetAlert =(text:string, timer: number = 1000)=>{
    const html = `<div style="text-align: center; padding: 20px;">
        <p style="font-size: 18px;">${text}</p>
      </div>`;

    return Swal.fire({
        html,
        timer,
        timerProgressBar: true,
        showConfirmButton: false,
    })
}



