'use strict'

const { models: { User, Comment, News } } = require('data')

const DATE_REGEX = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}')
const extApiNews = require('./newsConnection')
const logic = {

    //FOR USERS BBDD :

    /**
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} username
     * @param {string} password 
     * @param {string} birthdate 
     * @param {string} gender
     * @param {string} address 
     * @param {string} permission
     * 
     * @returns {Promise<boolean>}
     */
    registerUser(name, surname, email, username, password, birthdate, gender, address, permission) {
        const genders = ["male", "female", ""]
        const permissions = ['reader', 'editor', 'admin', 'unsubscribe']
        return Promise.resolve()
            .then(() => {
                if (typeof name !== 'string') throw Error('user name is not a string')
                if (!(name = name.trim()).length) throw Error('user name is empty or blank')

                if (typeof surname !== 'string') throw Error('user surname is not a string')
                if (!(surname = surname.trim()).length) throw Error('user surname is empty or blank')

                if (typeof email !== 'string') throw Error('user email is not a string')
                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof username !== 'string') throw Error('user username is not a string')
                if (!(username = username.trim()).length) throw Error('user username is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')
                if (!(password = password.trim()).length) throw Error('user password is empty or blank')

                if (typeof birthdate !== 'string') throw Error('user birthdate is not a string')
                if ((birthdate.trim().length > 0) && !DATE_REGEX.test(birthdate)) throw Error('user birthdate has not valid format')

                if (typeof gender !== 'string') throw Error('user gender is not a string')
                if (!genders.includes(gender)) throw Error('user gender value not admited')

                if (typeof address !== 'string') throw Error('user address is not a string')

                if (typeof permission !== 'string') throw Error('user permission is not a string')
                if (!(permission = permission.trim()).length) throw Error('user permission is empty or blank')
                if (!permissions.includes(permission)) throw Error('user permission value not admited')

                if (birthdate.trim().length > 0) birthdate = new Date(birthdate)

                return User.create({ name, surname, email, username, password, birthdate, gender, address, permission })
                    .then(() => true)
            })
    },

    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<string>}
     */
    authenticateUser(email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof email !== 'string') throw Error('user email is not a string')
                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')
                if (!(password = password.trim())) throw Error('user password is empty or blank')

                return User.findOne({ email, password })
            })
            .then(user => {
                if (!user) throw Error('wrong credentials')

                return user.id
            })
    },

    /**
     * 
     * @param {string} id
     * 
     * @returns {Promise<User>} 
     */
    retrieveUser(id) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')
                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                return User.findById(id).select({ _id: 0, name: 1, surname: 1, email: 1, username: 1, password: 1, birthdate: 1, gender: 1, address: 1, permission: 1 })
            })
            .then(user => {
                if (!user) throw Error(`no user found with id ${id}`)

                return user
            })
    },

    /**
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} username
     * @param {string} password 
     * @param {string} birthdate 
     * @param {string} gender
     * @param {string} address 
     * @param {string} permission
     * @param {string} newEmail 
     * @param {string} newPassword 
     * 
     * @returns {Promise<boolean>}
     */
    updateUser(id, name, surname, email, username, password, birthdate, gender, address, permission, newEmail, newPassword) {
        const genders = ["male", "female", ""]
        const permissions = ['reader', 'editor', 'admin', 'unsubscribe']
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')
                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                if (typeof name !== 'string') throw Error('user name is not a string')
                if (!(name = name.trim()).length) throw Error('user name is empty or blank')

                if (typeof surname !== 'string') throw Error('user surname is not a string')
                if (!(surname = surname.trim()).length) throw Error('user surname is empty or blank')

                if (typeof email !== 'string') throw Error('user email is not a string')
                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof username !== 'string') throw Error('user username is not a string')
                if (!(username = username.trim()).length) throw Error('user username is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')
                if (!(password = password.trim()).length) throw Error('user password is empty or blank')

                if (typeof birthdate !== 'string') throw Error('user birthdate is not a string')
                if ((birthdate.trim().length > 0) && !DATE_REGEX.test(birthdate)) throw Error('user birthdate has not valid format')

                if (typeof gender !== 'string') throw Error('user gender is not a string')
                if (!genders.includes(gender)) throw Error('user gender value not admited')

                if (typeof address !== 'string') throw Error('user address is not a string')

                if (typeof permission !== 'string') throw Error('user permission is not a string')
                if (!(permission = permission.trim()).length) throw Error('user permission is empty or blank')
                if (!permissions.includes(permission)) throw Error('user permission value not admited')

                if (birthdate.trim().length > 0) birthdate = new Date(birthdate)

                if (newEmail.trim().length > 0) if (typeof newEmail !== 'string') throw Error('user newEmail is not a string')

                if (newPassword.trim().length > 0) if (typeof newPassword !== 'string') throw Error('user newPassword is not a string')

                return User.findOne({ email, password })
            })
            .then(user => {
                if (!user) throw Error('wrong credentials')
                if (user.id !== id) throw Error(`no user found with id ${id} for given credentials`)

                user.name = name
                user.surname = surname
                user.email = newEmail ? newEmail : email
                user.username = username
                user.password = newPassword ? newPassword : password
                user.birthdate = birthdate
                user.gender = gender
                user.address = address
                user.permission = permission

                return user.save()
            })
            .then(() => true)
    },

    /**
     * 
     * @param {string} id 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
    unregisterUser(id, email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')
                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                if (typeof email !== 'string') throw Error('user email is not a string')
                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')
                if (!(password = password.trim()).length) throw Error('user password is empty or blank')

                return User.findOne({ email, password })
            })
            .then(user => {
                if (!user) throw Error('wrong credentials')
                if (user.id !== id) throw Error(`no user found with id ${id} for given credentials`)

                user.permission = "unsubscribe";

                return user.save()
            })
            .then(() => true)
    },

    // FOR EXTERN NEWS API :

    /**
     * 
     * @param {string} category 
     * 
     * @returns {Promise<array>}
     */
    getExternNewsBy(category) {
        return extApiNews.getNews(category)
    },

    // FOR NEWS BBDD :

    /**
     * 
     * @param {string} title
     * @param {string} picture 
     * @param {string} summary
     * @param {string} content
     * @param {string} category
     * @param {date} inputDate
     * @param {string} from
     * @param {boolean} isDeleted
     * @param {array} comments  // empty array
     * 
     * @returns {Promise<boolean>}
     */
    addNews(title, picture, summary, content, category, link, pubDate, from, comments) {
        return Promise.resolve()
            .then(() => {

                if (typeof title !== 'string') throw Error('title is not a string')
                if (!(title = title.trim()).length) throw Error('title is empty or blank')

                if (typeof picture !== 'string') throw Error('picture is not a string')

                if (typeof summary !== 'string') throw Error('summary is not a string')
                if (!(summary = summary.trim()).length) throw Error('summary is empty or blank')

                if (typeof content !== 'string') throw Error('content is not a string')
                if (!(content = content.trim()).length) throw Error('content is empty or blank')

                if (typeof category !== 'object') throw Error('category is not an array')

                if (typeof link !== 'string') throw Error('link is not a string')

                if (typeof pubDate !== 'string') throw Error('pubDate is not a string')
                if (!(pubDate = pubDate.trim()).length) throw Error('pubDate is empty or blank')

                if (typeof from !== 'string') throw Error('from is not a string')
                if (!(from = from.trim()).length) throw Error('from is empty or blank')

                if (typeof comments !== 'object') throw Error('comments is not an array')

                let newsId = pubDate.replace(/[- :]/gi, '');

                return News.create({ newsId, title, picture, summary, content, category, link, pubDate, from, comments })
                    .then(() => true)
            })
    },

    /**
     * 
     * @param {string} newsId
     * 
     * @returns {Promise<[News]>}
     */
    retrieveNews(newsId) {
        return Promise.resolve()
            .then(() => {
                if (typeof newsId !== 'string') throw Error('newsId is not a string')
                if (!(newsId = newsId.trim()).length) throw Error('newsId is empty or blank')

                return News.findOne({ newsId })
            })
            .then(item => {
                if (!item) throw Error('No news with newsId : ' + { newsId })

                return item
            })
    },

    /**
    * 
    * @param {string} newsId
    * 
    * @returns {Promise<Boolean>}
    */
    existItem(newsId) {
        return Promise.resolve()
            .then(() => {
                if (typeof newsId !== 'string') throw Error('newsId is not a string')
                if (!(newsId = newsId.trim()).length) throw Error('newsId is empty or blank')

                return News.findOne({ newsId })
            })
            .then(item => {
                if (!item) return false

                return true
            })
    },

    /**
     * 
     * @param {string} id
     * @param {string} title
     * @param {string} picture 
     * @param {string} summary
     * @param {string} content
     * @param {string} category
     * @param {date} inputDate
     * @param {string} from
     * @param {boolean} isDeleted
     * @param {array} comments
     * 
     * @returns {Promise<boolean>}
     */
    updateNews(newsId, title, picture, summary, content, category, link, pubDate, from, isDeleted, comments) {
        return Promise.resolve()
            .then(() => {
                if (typeof newsId !== 'string') throw Error('news newsId is not a string')
                if (!(newsId = newsId.trim()).length) throw Error('news newsId is empty or blank')

                if (typeof title !== 'string') throw Error('title is not a string')
                if (!(title = title.trim()).length) throw Error('title is empty or blank')

                if (typeof picture !== 'string') throw Error('picture is not a string')
                //if (!(picture = picture.trim()).length) throw Error('picture is empty or blank')

                if (typeof summary !== 'string') throw Error('summary is not a string')
                if (!(summary = summary.trim()).length) throw Error('summary is empty or blank')

                if (typeof content !== 'string') throw Error('content is not a string')
                if (!(content = content.trim()).length) throw Error('content is empty or blank')

                if (typeof category !== 'string') throw Error('category is not a string')
                if (!(category = category.trim()).length) throw Error('category is empty or blank')

                if (typeof inputDate !== 'date') throw Error('inputDate is not a date')
                if (!(inputDate = inputDate.trim()).length) throw Error('inputDate is empty or blank')

                if (typeof from !== 'string') throw Error('from is not a string')
                if (!(from = from.trim()).length) throw Error('from is empty or blank')

                if (typeof isDeleted !== 'boolean') throw Error('isDeleted is not a boolean')
                if (!(isDeleted = isDeleted.trim()).length) throw Error('isDeleted is empty or blank')

                if (typeof comments !== 'array') throw Error('comments is not a array')
                if (comments = comments.length) throw Error('comments is empty or blank')

                return News.findById(newsId)
            })
            .then(news => {
                if (!news) throw Error('wrong credentials')

                return news
            })
            .then(news => {
                news.title = title
                news.picture = picture
                news.summary = summary
                news.content = content
                news.category = category
                news.inputDate = inputDate
                news.from = from
                news.isDeleted = isDeleted
                news.comments = comments

                return news.save()
            })
            .then(() => true)
    },

    /**
     * 
     * @param {string} id
     * @param {objectId} commentId
     * 
     * @returns {Promise<boolean>}
     */
    updateCommentsArray(newsId, commentId) {
        return Promise.resolve()
            .then(() => {
                if (typeof newsId !== 'string') throw Error('news newsId is not a string')
                if (!(newsId = newsId.trim()).length) throw Error('news newsId is empty or blank')

                if (typeof commentId !== 'objectId') throw Error('commentId is not a string')
                if (!(commentId = commentId.trim()).length) throw Error('commentId is empty or blank')

                return News.findOne({ newsId })
            })
            .then(news => {
                if (!news) throw Error(`no news found with newsId ${newsId}`)

                return news
            })
            .then(news => {
                news.comments.push(commentId)

                return news.save()
            })
            .then(() => true)
    },

    /**
     * 
     * @param {string} id
     * 
     * @returns {Promise<boolean>}
     */
    deleteNews(newsId) {
        return Promise.resolve()
            .then(() => {
                if (typeof newsId !== 'string') throw Error('news newsId is not a string')
                if (!(newsId = newsId.trim()).length) throw Error('news newsId is empty or blank')

                return News.findByIdAndUpdate({ newsId }, { $set: { isDeleted: true } })
                    .then(news => {
                        if (!news) throw Error(`no news found with newsId ${newsId}`)

                        return news.isDeleted
                    })
            })
    },

    //FOR COMMENTS BBDD :

    /**
     * 
     * @param {string} userId
     * @param {string} newsId
     * @param {string} content
     * @param {date} inputDate
     * @param {boolean} isDeleted 
     * 
     * @returns {Promise<boolean>}
     */
    addComment(userId, newsId, content, isDeleted) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user id is not a string')
                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof newsId !== 'string') throw Error('news id is not a string')
                if (!(newsId = newsId.trim()).length) throw Error('news id is empty or blank')

                if (typeof content !== 'string') throw Error('content is not a string')
                if (!(content = content.trim()).length) throw Error('content is empty or blank')

                if (typeof isDeleted !== 'boolean') throw Error('isDeleted is not a boolean')
                if (!(isDeleted = isDeleted.trim()).length) throw Error('isDeleted is empty or blank')

                return User.findById(userId)    // Verifying that there is a user with this ID
                    .then(user => {
                        if (!user) throw Error(`no user found with id ${userId}`)
                        return News.findById(newsId)    // Verifying that there is a news with this ID
                            .then(news => {
                                if (!news) throw Error(`no user found with id ${newsId}`)
                                return Comment.create({ userId, newsId, content, inputDate, isDeleted })
                                    .then(() => true)
                            })

                    })
            })
    },

    /**
     * 
     * @param {string} commentId 
     * 
     * @returns {Promise<Note>}
     */
    retrieveComment(commentId) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user id is not a string')
                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof newsId !== 'string') throw Error('news id is not a string')
                if (!(newsId = newsId.trim())) throw Error('news id is empty or blank')

                if (typeof commentId !== 'string') throw Error('comment id is not a string')
                if (!(commentId = commentId.trim())) throw Error('comment id is empty or blank')

                return Comment.findById(commentId)
                    .then(comment => {
                        if (!comment) throw Error(`no comment found with id ${commentId}`)
                        return comment
                    })
            })
    },

    /**
     * @param {string} userId
     * 
     * @returns {Promise<[Comment]>}
     */
    listCommentsByUser(userId) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user id is not a string')
                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                return Comment.findById(userId)
                    .then(comments => {
                        if (!user) throw Error(`no comments found with id ${userId}`)

                        return comments.map(({ newsId, content, inputDate, isReachable, isDeleted }) => ({ newsId, content, inputDate, isReachable, isDeleted }))
                    })
            })
    },

    /**
     * @param {string} newsId
     * 
     * @returns {Promise<[Comment]>}
     */
    listCommentsByNews(newsId) {
        return Promise.resolve()
            .then(() => {
                if (typeof newsId !== 'string') throw Error('news id is not a string')
                if (!(newsId = newsId.trim()).length) throw Error('news id is empty or blank')

                return Comment.findById(newsId)
                    .then(comments => {
                        if (!comments) throw Error(`no comments found with id ${newsId}`)

                        return comments.map(({ userId, content, inputDate, isReachable, isDeleted }) => ({ newsId, content, inputDate, isReachable, isDeleted }))
                    })
            })
    },

    /**
     * 
     * @param {string} id
     * @param {string} userId 
     * @param {string} newsId 
     * @param {string} content
     * @param {boolean} inputDate
     * @param {boolean} isDeleted
     * 
     * @returns {Promise<boolean>}
     */
    updateComment(id, userId, newsId, content, inputDate, isDeleted) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('comment id is not a string')
                if (!(id = id.trim()).length) throw Error('comment id is empty or blank')

                if (typeof userId !== 'string') throw Error('user id is not a string')
                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof newsId !== 'string') throw Error('news id is not a string')
                if (!(newsId = newsId.trim()).length) throw Error('news id is empty or blank')

                if (typeof content !== 'string') throw Error('content is not a string')
                if (!(content = content.trim()).length) throw Error('content is empty or blank')

                if (typeof inputDate !== 'date') throw Error('inputDate is not a date')
                if (!(inputDate = inputDate.trim()).length) throw Error('inputDate is empty or blank')

                if (typeof isDeleted !== 'boolean') throw Error('isDeleted is not a boolean')
                if (!(isDeleted = isDeleted.trim()).length) throw Error('isDeleted is empty or blank')

                return Comment.findById(id)
                    .then(comment => {
                        if (!comment) throw Error(`no user found with id ${id}`)

                        return comment
                    })
                    .then(comment => {
                        comment.userId = userId
                        comment.newsId = newsId
                        comment.content = content
                        comment.inputDate = inputDate
                        comment.isDeleted = isDeleted

                        return comment.save()
                    })
                    .then(() => true)
            })
    },

    /**
     * 
     * @param {string} commentId 
     *
     * @returns {Promise<boolean>}
     */
    deleteComment(commentId) {
        return Promise.resolve()
            .then(() => {
                if (typeof commentId !== 'string') throw Error('comment id is not a string')
                if (!(commentId = commentId.trim()).length) throw Error('comment id is empty or blank')

                return Comment.findByIdAndUpdate({ id }, { $set: { isDelete: true } })
                    .then(comment => {
                        if (!comment) throw Error(`no comment found with id ${commentId}`)

                        return comment.isDelete
                    })
            })
    },

}
module.exports = logic