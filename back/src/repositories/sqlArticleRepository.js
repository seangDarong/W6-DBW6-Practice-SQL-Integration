import {pool} from '../utils/database.js';

//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//

// Get all articles
export async function getArticles() {
    // TODO
    const [rows] = await pool.query("SELECT * from articles");
    return rows;

}

// Get one article by ID
export async function getArticleById(id) {
    // TODO
    const [rows] = await pool.query("SELECT * FROM articles WHERE id = ?",[id]);
    return rows[0];
}

// Create a new article
export async function createArticle(article) {
    try {
        // Convert journalist to number
        const journalist_id = Number(article.journalist);
        const {title, content, category} = article;
        const [result] = await pool.query(
            "INSERT INTO articles (title, content, category, journalist_id) VALUES (?, ?, ?, ?)",
            [title, content, category, journalist_id]
        );
        return {id: result.insertId, ...article, journalist_id};
    } catch (error) {
        console.error('Error creating article:', error);
        throw error;
    }
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    const {title, content, journalist_id} = updatedData;
    await pool.query(
        "UPDATE articles SET title = ?, content = ?, journalist_id = ? WHERE id = ?",
        [title, content, journalist_id, id]
    );
    return {id, ...updatedData};
}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
    await pool.query("DELETE FROM articles where id = ?" , [id]);
}


// Fetch all articles with journalist names
export async function getAllArticlesWithJournalist() {
    const [rows] = await pool.query(
        `SELECT articles.*, journalists.name AS journalist
        FROM articles
        JOIN journalists ON articles.journalist_id = journalists.id`
    );
    return rows;
}

// Fetch articles by journalist name
export async function getArticlesWithJournalistById(articlesId) {
    const [rows] = await pool.query(
        `Select articles.* , journalists.name as journalist ,journalists.email, journalists.bio
        FROM articles
        JOIN journalists ON articles.journalist_id = journalists.id
        WHERE articles.id = ?`,
        [articlesId]
    );
    return rows[0];
}

//get articles by journalist id 
export async function getArticlesByJournalistId(journalist_id) {
    const [rows] = await pool.query(
        `Select articles.* , journalists.name as journalist ,journalists.email, journalists.bio
        from articles join journalists
        on articles.journalist_id = journalists.id
        where journalists.id = ?`,
        [journalist_id]
    );
    return rows;
}

