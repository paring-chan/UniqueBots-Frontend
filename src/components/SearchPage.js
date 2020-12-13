import React, {Component} from 'react';
import {Close, Filter, Filter1, FilterList, Search} from "@material-ui/icons";
import {
    AppBar, Avatar, Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, FormControlLabel,
    IconButton,
    InputBase, List,
    ListItem, ListItemAvatar,
    ListItemText, Switch,
    Toolbar, Typography
} from "@material-ui/core";
import {gql, graphql} from "@apollo/react-hoc";
import CustomPagination from "./CustomPagination";
import {Link} from "react-router-dom";

class SearchPage extends Component {
    state = {
        open: false,
        openFilter: false,
        regex: false,
        query: ''
    }

    render() {
        return (
            <>
                <IconButton onClick={() => this.setState({open: true})}>
                    <Search/>
                </IconButton>
                <Dialog fullScreen open={this.state.open}>
                    <AppBar color="inherit" position="sticky">
                        <Toolbar>
                            <InputBase fullWidth placeholder="검색어를 입력하세요.."
                                       onChange={async event => {
                                           const query = event.target.value
                                           this.setState({query})
                                           await this.props.data.refetch({
                                               query,
                                               queryType: this.state.regex ? 'regex' : 'plain',
                                               page: 1
                                           })
                                       }}/>
                            <div style={{flexGrow: 1}}/>
                            <IconButton onClick={() => this.setState({openFilter: true})} style={{
                                marginLeft: 10
                            }}>
                                <FilterList/>
                            </IconButton>
                            <IconButton onClick={() => this.setState({open: false})} style={{
                                marginLeft: 10
                            }}>
                                <Close/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        {
                            !this.state.query ? '검색어를 입력해주세요' : this.props.data.loading ? '로드중...' : this.props.data.error ? this.props.data.error.message :
                                this.props.data.bots.result.length ? <>
                                    <Typography variant="h4">검색 결과(하트순으로 정렬됩니다)</Typography>
                                    <List>
                                        {
                                            this.props.data.bots.result.map((it, key) => (
                                                <ListItem key={key} button component={Link} to={`/bots/${it.id}`} onClick={() => this.setState({open: false})}>
                                                    <ListItemAvatar>
                                                        <Avatar src={
                                                            it.avatar
                                                        }/>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={it.tag} secondary={it.brief}/>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                    <CustomPagination count={this.props.data.bots.pages} delay={0.5}
                                                      onChange={(e, v) => {
                                                          this.props.data.refetch({
                                                              page: v
                                                          })
                                                      }}/>
                                </> : '검색 결과가 없습니다'
                        }
                    </DialogContent>
                </Dialog>
                <Dialog open={this.state.openFilter} onClose={() => this.setState({openFilter: false})}>
                    <DialogTitle>검색 옵션</DialogTitle>
                    <DialogContent>
                        <FormControlLabel control={<Switch onClick={e => this.setState({regex: e.target.checked})}/>}
                                          label="정규표현식 검색"/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openFilter: false})}>
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default graphql(gql`
    query ($query: String, $page: Int!, $queryType: SearchType) {
        bots(page: $page, query: $query, queryType: $queryType) {
            pages
            result {
                id
                tag
                avatar
                brief
            }
        }
    }
`, {
    options: {
        variables: {
            query: '',
            page: 0,
            queryType: 'plain'
        }
    }
})(SearchPage)