import React, { useState, useEffect } from "react";
import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import { getNotionPages } from "../dataProcessor";

export default function NotionPageAutoComplete(props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const selectedPageCallback = props.selectedPageCallback;

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  async function handleInputChange(e) {
    const value = e.target.value;

    if (value.length > 0) {
      setLoading(true);

      const pages = await getNotionPages(value);
      setOptions(pages);

      setLoading(false);
    } else {
      setOptions([]);
    }
  }

  function handleOptionChange(event) {
    const { target } = event;
    const pageId = target.id;

    if (target.tagName.toLowerCase() === "div") {
      selectedPageCallback(pageId);
    }
  }

  return (
    <Autocomplete
      sx={{ width: "70%", display: "inline-block" }}
      freeSolo
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onChange={handleOptionChange}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      renderOption={(props, option) => (
        <Box {...props} key={option.id} id={option.id}>
          {option.emoji} {option.title}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="페이지 검색"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          onChange={handleInputChange}
        />
      )}
    />
  );
}
