'use strict';

const {Router} = require(`express`);
const statusCodes = require(`http-status`);
const {getAPI} = require(`../api`);
const {upload} = require(`../multer`);
const {ensureArray} = require(`../../helpers`);
const {getLogger} = require(`../../service/lib/logger`);

const MAX_FILE_SIZE = 1024 * 1024; // 1Mb
const api = getAPI();
const articlesRouter = new Router();
const logger = getLogger({name: `frontend-server`});

articlesRouter.get(`/category/:id`, (req, res) => {
  res.render(`articles-by-category`);
});

articlesRouter.get(`/add`, async (req, res) => {
  const allCategories = await api.getCategories();

  const categories = allCategories.map((item) => {
    return {
      name: item,
      checked: false,
    };
  });
  const article = {};

  logger.info(`Add new article page rendered.`);

  res.render(`post`, {article, categories});
});

articlesRouter.post(`/add`, upload.single(`upload`), async (req, res) => {
  const {body, file, fileError} = req;
  const {title, announcement, fullText, date, category} = body;
  const newArticle = {
    title,
    announce: announcement,
    fullText,
    createDate: date,
    category: ensureArray(category),
    picture: file ? file.filename : ``
  };

  try {
    if (fileError) {
      throw new Error(fileError);
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`The file size is too large`);
    }

    const newArticleResponse = await api.createArticle(newArticle);

    if (!newArticleResponse) {
      throw new Error(`New article is not created.`);
    }

    logger.info(`Article was created with id: ${newArticleResponse.id}`);

    res.redirect(`/my`);
  } catch (error) {
    const allCategories = await api.getCategories();

    const categories = allCategories.map((item) => {
      return {
        name: item,
        checked: (category || []).includes(item),
      };
    });

    logger.error(`Article is not created. ${error}`);

    res.render(`post`, {article: req.body, categories});
  }
});

articlesRouter.post(`/edit/:id`, upload.single(`upload`), async (req, res) => {
  const {body, file, params} = req;

  const {title, announcement, fullText, date, category, photo} = body;
  const editedArticle = {
    id: params.id,
    title,
    announce: announcement,
    fullText,
    createDate: date,
    category: ensureArray(category),
    picture: file ? file.filename : photo || ``
  };

  try {
    const editedArticleResponse = await api.updateArticle(editedArticle);

    if (!editedArticleResponse) {
      throw new Error(`The article is not changed, id: ${params.id}`);
    }

    logger.info(`Article was changed, id: ${editedArticleResponse.id}`);

    res.redirect(`/my`);
  } catch (error) {
    const allCategories = await api.getCategories();

    const categories = allCategories.map((item) => {
      return {
        name: item,
        checked: (category || []).includes(item),
      };
    });

    logger.error(`The article is not changed. ${error}`);

    res.render(`post`, {article: req.body, categories});
  }
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;

  try {
    const article = await api.getArticle(id);
    const allCategories = await api.getCategories();

    const formattedArticle = {
      ...article,
      createDate: article.createDate.slice(0, 10)
    };

    const categories = allCategories.map((item) => {
      return {
        name: item,
        checked: article.category.includes(item),
      };
    });

    if (!article || !categories) {
      logger.error(`Article not found. Id: ${id}`);

      res
        .status(statusCodes.NOT_FOUND)
        .render(`404`, {
          errorCode: statusCodes.NOT_FOUND
        });
    }

    logger.info(`Render article edit page, id: ${id}`);

    res.render(`post`, {article: formattedArticle, categories});
  } catch (error) {
    logger.error(`Cannot edit article. ${error}`);

    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .render(`500`, {
        errorCode: statusCodes.INTERNAL_SERVER_ERROR
      });
  }
});

articlesRouter.get(`/:id`, (req, res) => {
  res.render(`post-detail`);
});

module.exports = articlesRouter;
