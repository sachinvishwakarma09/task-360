import React from 'react'
import SelectDropdown from '../dropdown/SelectDropdown'

const Home = () => {
    const style = { textAlign: 'center' }
    return (
        <div>
            <h1 style={style}>Home</h1><hr />
            <SelectDropdown
                searchable={true} // false will make the search feature disabled
                multiselect={true} // false will disable the multislect feature
            />
        </div>
    )
}

export default Home