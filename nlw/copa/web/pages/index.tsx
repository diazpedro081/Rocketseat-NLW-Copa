interface homeProps {
  count: number;
}

export default function Home(props: homeProps) {
  return (
    <h1>Contagem: { props.count }</h1>
  )
}

export const getServersideProps = async () => {
  const response = await fetch("http://localhost:3333/pools/count")
  const data = await response.json()

  return {
    props: { 
      count: data.count,
     }
  }
  }

