import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Button from "@mui/joy/Button";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Delete from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Divider from "@mui/joy/Divider";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

export default function Todo() {
  const [inputxt, setInputTxt] = React.useState("");

  /* in this items array, we now have object having different keys like 
     checked, txt, and a unique id */
  const [items, setItems] = React.useState([]);

  const [btnToggle, setBtnToggle] = React.useState(false);
  const [currEditId, setCurrEditId] = React.useState(null);

  //add an item
  const addItem = () => {
    if (inputxt === "") return;
    else {
      setItems((prev) => {
        return [
          ...prev,
          // Use current time in millisec for a unique id.
          { id: new Date().getTime().toString(), txt: inputxt, checked: false }
        ];
      });
      setInputTxt("");
    }
  };

  //delete an item by fetching its unique id instead of index value
  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((ele) => ele.id !== id));
  };

  //1. Set the state of current id which is to be edited to be the the 'id' parameter
  //2. Set the add button toggler to true
  //3. Bring the txt of that item with id parameter to input field
  const editItem = (id) => {
    setCurrEditId(id);
    setBtnToggle(true);
    const item = items.find((ele) => ele.id === id);
    setInputTxt(item.txt);
  };

  /* when clicked on the save button, set the items array to be a new array where
     the item having the id equal to currEditId will have its txt changed to the
     current value of input field */
  const submitEditedItem = () => {
    setItems((prev) => {
      let newarr = prev.map((ele) => {
        return ele.id === currEditId ? { ...ele, txt: inputxt } : ele;
      });
      return newarr;
    });
    setBtnToggle(false);
    setInputTxt("");
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <Typography variant="h4" sx={{ padding: 3 }}>
          Todo List
        </Typography>
      </Grid>
      <Grid item>
        <Paper
          elevation={4}
          style={{ width: 380, minHeight: 200, padding: 15 }}
        >
          <Input
            endDecorator={
              !btnToggle ? (
                <IconButton variant="soft" onClick={addItem}>
                  <AddCircleOutlineRoundedIcon color="success" />
                </IconButton>
              ) : (
                <IconButton variant="soft" onClick={submitEditedItem}>
                  <SaveOutlinedIcon color="primary" />
                </IconButton>
              )
            }
            placeholder="Add Item..."
            sx={{
              "--Input-gap": "11px",
              "--Input-placeholderOpacity": 0.5,
              "--Input-focusedThickness": "2px",
              "--Input-minHeight": "41px",
              "--Input-paddingInline": "11px",
              "--Input-decoratorChildHeight": "31px"
            }}
            value={inputxt}
            variant="soft"
            onChange={(event) => {
              setInputTxt(event.target.value);
            }}
          />

          <Divider
            orientation="horizontal"
            sx={{ marginBottom: 2, marginTop: 3 }}
          />

          <List>
            {items.map((it) => {
              return (
                <ListItem
                  key={it.id}
                  endAction={
                    <>
                      <IconButton
                        aria-label="Delete"
                        size="sm"
                        color="neutral"
                        onClick={() => editItem(it.id)}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Delete"
                        size="sm"
                        color="danger"
                        onClick={() => deleteItem(it.id)}
                      >
                        <Delete />
                      </IconButton>
                    </>
                  }
                >
                  {/* when clicked on item, set the items array with the item having
                  id equal to the current clicked item's id, has the 'checked' key
                  to be toggled, which changes textDecoration accordingly */}
                  <ListItemButton
                    onClick={() => {
                      setItems((prevItems) =>
                        prevItems.map((item) =>
                          item.id === it.id
                            ? { ...item, checked: !item.checked }
                            : item
                        )
                      );
                    }}
                    sx={{
                      textDecoration: `${it.checked ? "line-through" : "none"}`
                    }}
                  >
                    {it.txt}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          {items.length !== 0 ? (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Button variant="outlined" onClick={() => setItems([])}>
                Clear All
              </Button>
            </Box>
          ) : null}
        </Paper>
      </Grid>
    </Grid>
  );
}
