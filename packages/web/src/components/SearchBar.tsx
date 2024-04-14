import {Input} from 'antd';

type SearchProps = {
    handleChange: (input: string) => void,
    inputValue: string,
}

const SearchBar = (props: SearchProps) => {

    const {handleChange, inputValue} = props;

    return (
        <div className="input-wrapper">
            <Input className="search-bar"
                   value={inputValue}
                   autoFocus={true}
                   placeholder="Search by artist..."
                   onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
}
export default SearchBar;
