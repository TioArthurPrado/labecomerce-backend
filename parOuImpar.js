// function getRndInteger(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// const numeroAleatorioEntreZeroeDez = getRndInteger(0, 10);
// console.log(numeroAleatorioEntreZeroeDez);

// let escolha = process.argv[2];
// let numero = Number(process.argv[3]);

// const result = (numero + numeroAleatorioEntreZeroeDez) % 2 === 0;
// console.log(result);

// const soma = numero + numeroAleatorioEntreZeroeDez;

// if (escolha === "par") {
//   if (result) {
//     console.log(
//       `Você escolheu par e o computador escolheu impar. O resultado foi ${soma} e você ganhou!`
//     );
//   } else {
//     console.log(
//       `Você escolheu par e o computador escolheu impar. O resultado foi ${soma} e você perdeu!`
//     );
//   }
// } else {
//   if (result === false) {
//     console.log(
//       `Você escolheu impar e o computador escolheu par. O resultado foi ${soma}. Você ganhou!`
//     );
//   } else {
//     console.log(
//       `Você escolheu impar e o computador escolheu par. O resultado foi ${soma}. Você perdeu!`
//     );
//   }
// }



const numeroAlatorioEntreUmETres = getRndInteger(1, 3);
console.log(numeroAlatorioEntreUmETres);

const escolha = process.argv[2]
let escolhaPc = ""

switch (numeroAlatorioEntreUmETres) {
    case 1:
        escolhaPc = "tesoura"
        break;
    case 2:
        escolhaPc = "pedra"
        break;
    case 3:
        escolhaPc = "papel"
        break;
    default:
        break;
}

if((escolha === "tesoura" && escolhaPc === "papel") || (escolha === "pedra"  &&escolhaPc === "tesoura") || (escolha === "papel" && escolhaPc==="pedra")){
    console.log(`Você escolheu ${escolha} e o computador escolheu ${escolhaPc}. Você ganhou!`)
}else if (escolha === escolhaPc){
    console.log(`Você escolheu ${escolha} e o computador escolheu ${escolhaPc}. Deu empate`)
}else{
    console.log(`Você escolheu ${escolha} e o computador escolheu ${escolhaPc}.
    Você perdeu!`)
}