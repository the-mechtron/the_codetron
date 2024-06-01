import LANGUAGE_DATA from '../data.json'


export default function LanguageDropdown ({language, onSelectLanguage}) {
  return <select
           className='dropdown'
           name='language'
           value={language}
           onChange={e => onSelectLanguage(e)}>
           {LANGUAGE_DATA.map((data, index) => {
              return <option key={data.id} index={index}>
                       {data.language}
                     </option>
            })}
         </select>
}
