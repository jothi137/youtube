import React, { Component } from 'react';    // has all the react components.
import ReactDOM from 'react-dom'; //React DOM is the virtual DOM where we render JSX views.
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import YTSearch from 'youtube-api-search';
import _ from 'underscore';
const API_KEY = 'AIzaSyBsanrAHdcAJPyc1gD0CsNKzvXeOSSrcQY'; // youtube API key.

//This is the component class.
class APP extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            videos: [],
            selectedVideo: null
        };
        
        this.videoSearch('surfboards');
    }
    
    videoSearch(term) {
        YTSearch({term: term, key: API_KEY}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            }); //ES6 syntax when key and value are same.
        })
    }
    render () {
        const debouncedSearch = _.debounce((term) => { this.videoSearch(term)}, 500);
        return (
            // JSX syntax which will get transpiled by Babel to Vanila JS.
            <div>
                <SearchBar onSearchTermChange={debouncedSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                    videos={this.state.videos}
                />
            </div>
        );
    }
};

/*
 * Render takes 2 arguments -
 * - Instance of the component to be rendered.
 * - Element in the DOM where the component has to be rendered.
 */
ReactDOM.render(<APP />, document.querySelector('.container'));
