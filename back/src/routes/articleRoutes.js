import { Router } from "express";
import { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle,getArticlesByJournalistId} from "../controllers/articleController.js";

const articleRouter = Router();
articleRouter.get("/journalists/:id/articles",getArticlesByJournalistId);
articleRouter.get("/", getAllArticles);
articleRouter.get("/:id", getArticleById);
articleRouter.post("/", createArticle);
articleRouter.put("/:id", updateArticle);
articleRouter.delete("/:id", deleteArticle);



export default articleRouter;
