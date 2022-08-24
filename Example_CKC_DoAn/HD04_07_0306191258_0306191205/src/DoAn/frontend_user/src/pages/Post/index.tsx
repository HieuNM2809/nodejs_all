import { Grid, Container, Button, Typography } from "@mui/material";
import Loading from "components/Backdrop";
import Footer from "components/Footer";
import Header from "components/Header"
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { Major } from "models/major";
import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import MajorService from "services/major";
import PostService from "services/post";
import { fetchPostActions, fetchPosts } from "store/post/post-actions";
// import { fetchPosts } from "store/post/post-actions";
import { fetchPostTypes } from "store/postType/postType-actions";
import classes from './styles.module.scss';
import { Post } from "models/post";
import { set } from "react-hook-form";
const News = () => {
    const dispatch = useAppDispatch();

    const allPostTypes = useAppSelector(state => state.postTypes.all_options);
   
    const [stateIdPostType, setStateIdPostType] = useState("");
    const [stateNamePostType, setStateNamePostType] = useState("");
    const [statePost, setStatePost] = useState("");
    const [allMajor, setAllMajor] = useState<Major[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [majorId, setMajorId] = useState("");
    const [allPost, setAllPost] = useState<Post[]>([]);

    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchPostTypes())
        MajorService.getMajors().then((res) => {
            setAllMajor(res)
        })
        PostService.getPosts().then((res) => {
            setAllPost(res)
            setIsLoading(false)
        })
    }, [])


    const handleChangeFind = (event: any) => {
        setMajorId(event.target.value)
    }
    const filterPostMajor = () => {
        setIsLoading(true)
        if (majorId === "") {

            PostService.getPostPostType("628e51be610eed65160e3ae7").then((res) => {
                setAllPost(res)
                setIsLoading(false)
            })
            return;
        }
        PostService.getPostsMajor(majorId).then((res) => {
            setAllPost(res)
            setIsLoading(false)
        })
    }
    useEffect(() => {
        if(majorId===""){
            return;
        }
        filterPostMajor()
    }, [majorId])

    const changePostType = (id: string) => {
        if (id === "") {
            PostService.getPosts().then((res) => {
                setAllPost(res)

            })
        }
        setStateIdPostType(id);
        setIsLoading(true)
        PostService.getPostPostType(id).then((res) => {
            setAllPost(res)
            setIsLoading(false)
        })
  

    }
    const changePostTypeAll = () => {
        setStateIdPostType("")
        setIsLoading(true)
        PostService.getPosts().then((res) => {
            setAllPost(res)
            setIsLoading(false)
        })
    }

    return (<>
        <Header></Header>
        <Grid className={classes.backGroundBig}>
            <Container sx={{ minHeight: "60.7vh" }}>
                <Grid sx={{ margin: "10px 0px" }}>
                    <Button onClick={changePostTypeAll} sx={{ margin: " 0px" }}
                        className={stateIdPostType === "" ? classes.active :
                            classes.notActive}>Tất cả</Button>
                    {
                        allPostTypes.map((posTy: any, index: number) => (

                            <Button onClick={() => changePostType(posTy?._id)} key={index} className={stateIdPostType === posTy?._id ? classes.active :
                                classes.notActive}>
                                {/* <Button onClick={() => setStateNamePostType(posTy?.name)}>{posTy?.name}</Button> */}
                                {posTy?.name}
                            </Button>
                        ))
                    }
                </Grid>

                {stateIdPostType === "628e51be610eed65160e3ae7" ? <Grid>
                    <select onChange={handleChangeFind} className={classes.selectMajor} value={majorId}>
                        <option value={""} >Tất cả</option>
                        {allMajor?.map((maj: any, index: number) => (
                            <option value={maj?._id} key={index}>{maj?.name}</option>
                        ))}


                    </select>
                </Grid> : ""}
                {allPost?.length < 1 ? <Typography variant="h4" align="center">Chưa có bài viết!</Typography> : ""}
                {isLoading ? <Loading /> : <Grid container spacing={1} >

                    {allPost?.map((pos: any, index) => (
                        <Grid item className={classes.box} xs={6} md={4} lg={3} key={index}>
                            <Link to={`/post/${pos?._id}`} className={classes.link}>
                                <Grid className={classes.content}>
                                    <img src={pos?.images[0]?.URL} alt="" className={classes.imgBox} />
                                    <Grid className={classes.text}>
                                        <p className={classes.title}>{pos?.title} </p>
                                        <p className={classes.contentText}>{pos?.content}</p>
                                    </Grid>
                                </Grid>
                            </Link>

                        </Grid>


                    ))}

                </Grid>}

            </Container>
        </Grid>

        <Footer></Footer>
    </>

    )
}
export default News;