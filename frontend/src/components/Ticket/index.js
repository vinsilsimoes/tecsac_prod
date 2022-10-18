import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import openSocket from "socket.io-client";
import clsx from "clsx";

import { Paper, makeStyles, Switch, FormGroup, FormControlLabel, Grid, Box } from "@material-ui/core";

import ContactDrawer from "../ContactDrawer";
import MessageInput from "../MessageInput/";
import TicketHeader from "../TicketHeader";
import TicketInfo from "../TicketInfo";
import TicketActionButtons from "../TicketActionButtons";
import MessagesList from "../MessagesList";
import api from "../../services/api";
import { ReplyMessageProvider } from "../../context/ReplyingMessage/ReplyingMessageContext";
import toastError from "../../errors/toastError";

const http = require('http');

const init = {
  host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
  path: '/zdgDialogFlowOn',
  method: 'POST',
  headers: {
    'content-type': 'application/json; charset=utf-8'
  }
};

const init2 = {
  host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
  path: '/zdgDialogFlowOff',
  method: 'POST',
  headers: {
    'content-type': 'application/json; charset=utf-8'
  }
};

const init3 = {
  host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
  path: '/zdgChatBotOn',
  method: 'POST',
  headers: {
    'content-type': 'application/json; charset=utf-8'
  }
};

const init4 = {
  host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
  path: '/zdgChatBotOff',
  method: 'POST',
  headers: {
    'content-type': 'application/json; charset=utf-8'
  }
};

const init5 = {
  host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
  path: '/zdgDialogFlowOnAudio',
  method: 'POST',
  headers: {
    'content-type': 'application/json; charset=utf-8'
  }
};

const init6 = {
  host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
  path: '/zdgDialogFlowOffAudio',
  method: 'POST',
  headers: {
    'content-type': 'application/json; charset=utf-8'
  }
};

const callback = function(response) {
  let result = Buffer.alloc(0);
  response.on('data', function(chunk) {
    result = Buffer.concat([result, chunk]);
  });
  
  response.on('end', function() {
    console.log(result.toString());
  });
};

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },

  ticketInfo: {
    maxWidth: "50%",
    flexBasis: "50%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "80%",
      flexBasis: "80%",
    },
  },
  ticketActionButtons: {
    maxWidth: "50%",
    flexBasis: "50%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      flexBasis: "100%",
      marginBottom: "5px",
    },
  },

  mainWrapper: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeft: "0",
    marginRight: -drawerWidth,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  mainWrapperShift: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  button: {
		position: "relative",
		backgroundColor: "green",
    fontSize: "10px",
    margin: "35px",
    marginLeft: "2px",
    marginRight: "2px",
    color: "#FFF",
    width: "5%",
    '&:hover': {
      backgroundColor: "red",
      color: "#FFF"
    },    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      flexBasis: "100%",
      margin: "5px",
      marginLeft: "50px",
      marginRight: "50px",
      marginBottom: "5px",
    },
	},
  box: {
		position: "relative",
    marginLeft: "2px",
    marginRight: "2px",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
	},
}));

const Ticket = () => {

  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);

  const { ticketId } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState({});
  const [ticket, setTicket] = useState({});

  async function DialogFlowOn() {
    const req = http.request(init, callback);
    const body = `{"msgFrom":"${contact.number}"}`;
    await req.write(body);
    alert(`DialogFlow ON: ${contact.name} - WPP: ${contact.number} Ticket: #${ticket.id}`);
    req.end();
  }

  async function DialogFlowOff() {
    const req = http.request(init2, callback);
    const body = `{"msgFrom":"${contact.number}"}`;
    await req.write(body);
    alert(`DialogFlow Off: ${contact.name} - WPP: ${contact.number} Ticket: #${ticket.id}`);
    req.end();
  }

  async function DialogFlowOnAudio() {
    const req = http.request(init5, callback);
    const body = `{"msgFrom":"${contact.number}"}`;
    await req.write(body);
    alert(`DialogFlow AUDIO ON: ${contact.name} - WPP: ${contact.number} Ticket: #${ticket.id}`);
    req.end();
  }

  async function DialogFlowOffAudio() {
    const req = http.request(init6, callback);
    const body = `{"msgFrom":"${contact.number}"}`;
    await req.write(body);
    alert(`DialogFlow AUDIO Off: ${contact.name} - WPP: ${contact.number} Ticket: #${ticket.id}`);
    req.end();
  }

  async function ChatBotOn() {
    const req = http.request(init3, callback);
    const body = `{"msgFrom":"${contact.number}"}`;
    await req.write(body);
    alert(`MYSQL On: ${contact.name} - WPP: ${contact.number} Ticket: #${ticket.id}`);
    req.end();
  }

  async function ChatBotOff() {
    const req = http.request(init4, callback);
    const body = `{"msgFrom":"${contact.number}"}`;
    await req.write(body);
    alert(`MYSQL Off: ${contact.name} - WPP: ${contact.number} Ticket: #${ticket.id}`);
    req.end();
  }

  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      const fetchTicket = async () => {
        try {
          const { data } = await api.get("/tickets/" + ticketId);

          setContact(data.contact);
          setTicket(data);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          toastError(err);
        }
      };
      fetchTicket();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [ticketId, history]);

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_BACKEND_URL);

    socket.on("connect", () => socket.emit("joinChatBox", ticketId));

    socket.on("ticket", (data) => {
      if (data.action === "update") {
        setTicket(data.ticket);
      }

      if (data.action === "delete") {
        toast.success("Ticket deleted sucessfully.");
        history.push("/tickets");
      }
    });

    socket.on("contact", (data) => {
      if (data.action === "update") {
        setContact((prevState) => {
          if (prevState.id === data.contact?.id) {
            return { ...prevState, ...data.contact };
          }
          return prevState;
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [ticketId, history]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if(checked === false)
    {
      DialogFlowOn();
    }
    else if (checked === true ){
      DialogFlowOff();
    }
  };

  const handleChange2 = (event) => {
    setChecked2(event.target.checked);
    if(checked2 === false)
    {
      ChatBotOn();
    }
    else if (checked2 === true ){
      ChatBotOff();
    }
  };

  const handleChange3 = (event) => {
    setChecked3(event.target.checked);
    if(checked3 === false)
    {
      DialogFlowOnAudio();
    }
    else if (checked3 === true ){
      DialogFlowOffAudio();
    }
  };

  return (
    <div className={classes.root} id="drawer-container">
      <Paper
        variant="outlined"
        elevation={0}
        className={clsx(classes.mainWrapper, {
          [classes.mainWrapperShift]: drawerOpen,
        })}
      >
        <TicketHeader loading={loading}>
          <div className={classes.ticketInfo}>
            <TicketInfo
              contact={contact}
              ticket={ticket}
              onClick={handleDrawerOpen}
            />
          </div>
          <div className={classes.ticketActionButtons}>
            <TicketActionButtons ticket={ticket} />
          </div>
          {/* <Button className={classes.button} onClick={() => {DialogFlowOn();}}>DialogON</Button>
          <Button className={classes.button} onClick={() => {DialogFlowOff();}}>DialogOff</Button>
          <Button className={classes.button} onClick={() => {ChatBotOn();}}>MYSQLOn</Button>
          <Button className={classes.button} onClick={() => {ChatBotOff();}}>MYSQLOff</Button> */}
        </TicketHeader>
        <Box className={classes.box}>
        <Grid container spacing={1} style={{display:'flex', alignItems:'center', textAlign: 'center', backgroundColor:'#ebebeb', padding:'10px'}}>
          <Grid item xs={12} md={4} sm={3}>
          <FormGroup row>
          <FormControlLabel control={
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />}label="DialogFlow" />
          </FormGroup>
          </Grid>
          <Grid item xs={12} md={4} sm={3}>
          <FormGroup row>
          <FormControlLabel control={
          <Switch
            checked={checked3}
            onChange={handleChange3}
            inputProps={{ 'aria-label': 'controlled' }}
          />}label="DialogFlowAudio" />
          </FormGroup>
          </Grid>
          <Grid item xs={12} md={4} sm={3}>
          <FormGroup row>
          <FormControlLabel control={
          <Switch
            checked={checked2}
            onChange={handleChange2}
            inputProps={{ 'aria-label': 'controlled' }}
          />}label="MYSQL" />
          </FormGroup>
          </Grid>
        </Grid>
        </Box>
        <ReplyMessageProvider>
          <MessagesList
            ticketId={ticketId}
            isGroup={ticket.isGroup}
          ></MessagesList>
          <MessageInput ticketStatus={ticket.status} />
        </ReplyMessageProvider>
      </Paper>
      <ContactDrawer
        open={drawerOpen}
        handleDrawerClose={handleDrawerClose}
        contact={contact}
        loading={loading}
      />
    </div>
  );
};

export default Ticket;
