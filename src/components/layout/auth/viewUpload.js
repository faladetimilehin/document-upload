import React, { Component } from 'react'
import FileViewer from 'react-file-viewer';
import axios from 'axios';

export default class viewUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: [],
            viewFile: null
        }
         this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const fetchFiles = async () => {
            const filesRequest = await axios.get('http://localhost:3004/upload');
            this.setState({ files: filesRequest.data })
        }

        return fetchFiles();
    }

    converBase64StringToFile = (fileUrl = '', fileName) => {
        const array = fileUrl.split(',');
        const mime = array[0].match(/:(.*?);/)[1];
        const byteString = atob(array[1])
        let n = byteString.length;
        const uint8Array = new Uint8Array(n);

        while (n--) {
            uint8Array[n] = byteString.charCodeAt(n);
        }

        return new File([uint8Array], fileName, { type: mime });
    }

    handleClick = (value) => {
        const foundFile = this.state.files.find(file=> file.fileName === value)
        if(foundFile) return this.setState({
            ...this.state,
            viewFile: foundFile
        })
    }
    render() {
        return (
            <div className="mt-3">
                {
                    this.state.files.length > 0 ? this.state.files.map((fileObj) => (
                        <div key={fileObj.fileName} className="p-2 mb-3">
                            <h5>{fileObj.fileName}</h5>
                            <button className="btn btn-primary btn-sm" onClick={()=>this.handleClick(fileObj.fileName)}>{fileObj.fileName}</button>
                        </div>
                    )) : (<div>
                        'nothing to display'
                    </div>)
                }
                {this.state.viewFile !== null ? 
                (
                <div className="text-center">
                    <FileViewer fileType={this.state.viewFile.fileName.split('.')[1]} filePath={this.state.viewFile.file} />
                </div>
                ) : null }
            </div>
        )
    }
}


