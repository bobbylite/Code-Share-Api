import React from 'react';
import '../css/ace.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import brace from 'brace';
import AceEditor from 'react-ace';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import 'brace/mode/typescript';
import 'brace/theme/kuroir';
import { stat } from 'fs';

this.state = {
    code: `const onLoad = (editor) => {\n\tconsole.log("i've loaded");\n};`,
    isError: false, 
    email: ''
}

const styles = theme => ({
root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
},
});

const theme = createMuiTheme({
    palette: {
    primary: {
        main: '#4fc3f7'
    },
    secondary: {
        main: '#81c784',
    },
    },
});

const Ace = (props) => {
    const { classes } = props;

    const onMailClick = (e) => {
        console.log(e);
        postCodeEmail();
      }
      
    const onTwitterClick = (e) => {
      
      }

    const onChange = (newValue) => {
        this.state.code = newValue;
        console.log(this.state.code);
    }
    
    const onLoad = (params) => {
        console.log(params);
    }

    const onTextFIeldChange = (e) => {
        this.setState({
            [email]: event.target.value,
          });
        console.log(this.state.email);
    }

    return (
        <MuiThemeProvider theme={theme}>
            <div className="ace">
            <br/>
            <AceEditor
                mode="typescript"
                theme="kuroir"
                name="blah2"
                onLoad={onLoad}
                onChange={onChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={this.state.code}
                setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
                }}/>
                <br/>
                <TextField
                id="full-width"
                label="Send to:"
                InputLabelProps={{
                    shrink: true,
                }}
                placeholder="codeshare@example.com"
                helperText="Happy Hacking!"
                fullWidth
                margin="normal"
                onChange={onTextFIeldChange}
                error={this.state.isError}/>
            </div>
                <Button 
                color="secondary" 
                onClick={onMailClick}
                className={classes.button}>
                    Send
                </Button>
        </MuiThemeProvider>
    );
}

const postCodeEmail = () => {
    axios.post('http://bobbysapps.com:8080/', {
      code: this.state.code, 
      toEmail: this.state.email
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

Ace.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Ace);
