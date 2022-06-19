import React, { useState, useEffect } from "react";
import { AutoComplete, Input, Dropdown, Checkbox, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { ElementTagInterface } from "src/Interfaces/Search";
import SearchTags from "./searchTags";
import { ReactComponent as InputSearchIcon } from "../../assets/img/searchInputIcon.svg";


const Search = () => {
     const [openAutoComplete, setOpenAutoComplete] = useState({
       clicked_type: "",
       open: false,
     });
     const [inputValue, setInputValue] = useState("");
     const [tags, setTags] = useState([]);


     useEffect(() => {
       // Loop through tags and remove id property
       let newTags = tags.map((tag) => {
         return {
           type: tag.type,
           value: tag.value,
         };
       });
       //   dispatch(setSearchQuery(newTags));
       //   if (tags.length > 0) {
       //     dispatch(setSearchEnabled(true));
       //   } else {
       //     dispatch(setSearchEnabled(false));
       //   }
       // api call
     }, [tags]);

   

     const renderTitle = (title: string) => {
       return <span className="auto-complete-rendered-Title">{title}</span>;
     };

     const renderItem = (prefix: string) => ({
       value: prefix,
       label: (
         <div key={inputValue} className="auto-complete-rendered-Label">
           {inputValue}
         </div>
       ),
     });
    

     let options = [
       {
         type: "Tags",
         label: renderTitle("Tags"),
         options: [renderItem("Tags")],
       },
       {
         type: "User",
         label: renderTitle("User"),
         options: [renderItem("User")],
       },
       {
         type: "Conversations",
         label: renderTitle("Conversations"),
         options: [renderItem("Conversations")],
       },
     ];

     const onFocus = () => {
       if (openAutoComplete.open) {
         setOpenAutoComplete({ clicked_type: "onFocus", open: false });
       } else {
         if (inputValue) {
           setOpenAutoComplete({ clicked_type: "onFocus", open: true });
         }
       }
     };

     const onSelect = (value: any, option: any) => {
       if (value === "All Properties") {
         return;
       } else {
         if (openAutoComplete.open) {
           setOpenAutoComplete({ clicked_type: "onSelect", open: false });
           setInputValue("");
         } else {
           setOpenAutoComplete({ clicked_type: "onSelect", open: true });
         }
         let convertTagType = value.toLowerCase();
         if (convertTagType === "events") {
           convertTagType = "event";
         }
         if (convertTagType === "user") {
           convertTagType = "identify";
         }
         setTags([
           ...tags,

           {
             id: JSON.stringify({ type: value, value: inputValue }),
             type: convertTagType,
             value: inputValue,
           },
         ]);
       }
     };

     const onClick = () => {
       if (
         openAutoComplete.clicked_type === "onSelect" &&
         openAutoComplete.open === false
       ) {
         if (inputValue.length > 0) {
           setOpenAutoComplete({ clicked_type: "onClick", open: true });
         }
       }
     };

     const onBlur = () => {
       setOpenAutoComplete({ clicked_type: "onBlur", open: false });
     };

     const onChange = (value: string) => {
       if (value === "All Properties") {
         return;
       } else {
         setOpenAutoComplete({ clicked_type: "onFocus", open: true });
         setInputValue(value);
       }
       if (value.length === 0) {
         setOpenAutoComplete({ clicked_type: "onFocus", open: true });
       }
     };

     const onKeydown = (event: any) => {
       if (event.keyCode === 13) {
         setOpenAutoComplete({ clicked_type: "onFocus", open: false });
         setInputValue("");
       }
     };

     const onTagClose = (event: any, element: ElementTagInterface) => {
       event.preventDefault();
       const filteredTags = tags.filter((tag) => tag.id !== element.id);
       setTags(filteredTags);
     };

  
  return (
    <>
      <AutoComplete
        listHeight={1000}
        className="search-auto-complete"
        dropdownClassName="certain-category-search-dropdown"
        options={options}
        open={openAutoComplete.open}
        onFocus={onFocus}
        onClick={onClick}
        onSelect={onSelect}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeydown}
      >
        <div>
          {tags.length > 0 && (
            <SearchTags tags={tags} onTagClose={onTagClose} />
          )}
          <Input
            prefix={tags.length === 0 && <InputSearchIcon />}
            className="search-input-auto-complete"
            size="large"
            placeholder="Search for Tags, Convo, etc..."
            value={inputValue}
          />
        </div>
      </AutoComplete>
    </>
  );
};

export default Search;