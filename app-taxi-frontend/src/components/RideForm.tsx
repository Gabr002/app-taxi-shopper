import { useForm, SubmitHandler } from "react-hook-form"


type Inputs = {
  idUser: number
  adressOrigin: string
  adressDestination: string
}

export const RideForm = () => {
  const {
    register,
    handleSubmit,
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return(
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("idUser")} />
        <input {...register("adressOrigin")} />
        <input {...register("adressDestination")} />
        <button type="submit">Calcular distância</button>
      </form>
    </div>
  )
}