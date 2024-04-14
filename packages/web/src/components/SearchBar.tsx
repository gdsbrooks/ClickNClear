import {Input, Select} from 'antd';
import type {SelectProps} from 'antd';
import type {Track} from "types";

type SearchProps = {
    handleChange: () => void,
    inputValue: string,
    results: Track[]
}

const SearchBar = (props: SearchProps) => {

    const {handleChange, inputValue, results} = props;

    const filterOption = (input: string, option: { label: string; value: string }) =>
        (option.label ?? '').toLowerCase().includes(input.toLowerCase());

    const options: SelectProps['options'] = results.map((track) => {
        return {
            value: track.id,
            label: track.artist
        }
    })


    return (
        <div className="input-wrapper">
            <Input className="search-bar"
                   value={inputValue}
                   autoFocus={true}
                   placeholder="Select a track..."
                   optionFilterProp="children"
                   onChange={(e) => handleChange(e.target.value)}
                   filterOption={filterOption}
                   options={options}
            />
        </div>
    );
}
export default SearchBar;
