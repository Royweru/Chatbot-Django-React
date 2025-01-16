import {BeatLoader} from 'react-spinners'

export const ChatBox = ({
    content,
    isLoading
}:{
    content:string,
    isLoading:boolean
}) => {
  return (
    <div className=' p-3.5 flex items-center justify-start rounded-xl bg-white shadow-sm'>
      {isLoading? (
         <BeatLoader className=' text-zinc-500/75 font-bold size-5 animate-pulse' />
      ):(
         <p className=' font-poppins text-sm font-semibold text-zinc-800/85 tracking-wide leading-relaxed'>
         {content}
       </p>
      )}
         
        </div>
  )
}
