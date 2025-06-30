import video from "/54026.mp4";

export default function BackgroundVideo() {
  return (
    <>
      <div className='absolute inset-0'>
        <video className='object-cover w-full h-full  bg-gray-600 opacity-45 blur-2xl' autoPlay muted loop 	>
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </>
  )
}
