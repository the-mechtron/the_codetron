export default function OutputArea ({output}) {
  return <div className='output'>
           <div className='output-header'>
             Output:
           </div>
           <div className='output-area'>
             <p>
             </p>
             {output}
           </div>
         </div>
}
