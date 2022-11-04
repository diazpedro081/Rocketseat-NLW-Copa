// interface HomeProps {
//   count: number;
// }
import Image from "next/image";
import appPreviewImg from "/Users/diazpedro081/estudos/Rocketseat-NLW-Copa/nlw/copa/web/src/assets/app-nlw-copa-preview.png";
import logoImg from "/Users/diazpedro081/estudos/Rocketseat-NLW-Copa/nlw/copa/web/src/assets/logo.svg";
import userAvatarExampleImg from "/Users/diazpedro081/estudos/Rocketseat-NLW-Copa/nlw/copa/web/src/assets/users-avatar-example.png"
import iconCheckImg from "/Users/diazpedro081/estudos/Rocketseat-NLW-Copa/nlw/copa/web/src/assets/icon-check.svg"
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("")

  console.log(poolTitle)

  async function createPool(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post("/pools", {
        title: poolTitle,
      });

      const { code } = response.data

      await navigator.clipboard.writeText(code)

      alert("bolão criado com sucesso, o código foi copiado para a area de trasnferencia")

      setPoolTitle("")
    } catch (err) {
      console.log(err)
      alert("Falaha ao criar o bolãom tente novamente!")
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="NLW-Copa" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className="mt-10 flex items-center gap-2 ">
          <Image src={userAvatarExampleImg} alt="" />

          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.poolCount}</span> pessoal já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-gray-100"
            type="text"
            required placeholder="Qual nome do seu bolão?"
            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700" type="submit">Criar meu botão</button>
        </form>

        <p className="mt-4 text-sm text-gray-300">Após criar seu bolão, você receberá um código único que poderá usar parar convidar outras pessoas 🚀</p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font=bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600"></div>

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span>+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>

        </div>
      </main>

      <Image
        src={appPreviewImg} alt="Dois celulares exibindo umm previa da aplicação movel do NWL Copa"
        quality={100}
      />

    </div>
  )
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get("pools/count"),
    api.get("guesses/count"),
    api.get("users/count")
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    }
  }
}

