import request from 'superagent';

/////////// new Color Request ///////////

export let colorPallete = ["#00A0B0", "#6A4A3C", "#CC333F", "#EB6841", "#EDC951"];

export default function randomColorRequest() {
  request.get(`/color`)
         .then((data) => {
          colorPallete = data.body
          console.log(data.body);
          return data.body
          })
}



