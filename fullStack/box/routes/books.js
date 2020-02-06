const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']


// 总入口

router.get('/', async (req, res) => {
    let query = Book.find()
    if(req.query.title != null && req.query.title != '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if(req.query.publishedBefore != null && req.query.publishedBefore != '') {
        query = query.lte('publishDate', req.query.publishedBefore )
    }
    if(req.query.publishedAfter != null && req.query.publishedAfter != '') {
        query = query.gte('publishDate', req.query.publishedAfter )
    }
    try {
        const books = await query.exec()
        res.render('books/index', {
            books: books,
            searchOptions : req.query
        })
        
    } catch  {
       res.redirect('/') 
    }
    
});


// 添加书籍
router.get('/new', async (req, res) => {
    renderNewPage(res, new Book())
});

// 添加书籍
router.post('/', async (req, res) => {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      publishDate: new Date(req.body.publishDate),
      pageCount: req.body.pageCount,
      description: req.body.description
    })
    saverCover(book, req.body.cover)
    try {
      const newBook = await book.save()
      // res.redirect(`books/${newBook.id}`)
      res.redirect(`books`)
    } catch {
      renderNewPage(res, book, true)
    }
})


router.get('/:id', async (req,res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author').exec()
    res.render('books/show', { book : book })
  } catch  {
    req.redirect('/')
  }
})

router.get('/:id/edit', async (req, res) => {

  try {
    const book = await Book.findById(req.params.id)
    renderEditPage(res, book)
  } catch  {
    
  }
  
});

// 添加书籍
router.put('/:id', async (req, res) => {
  let book
  try {
    book = await Book.findById(req.params.id)
    book.title = req.body.title
    book.author = req.body.author
    book.publishDate = new Date(req.body.publishDate)
    book.pageCount = req.body.pageCount
    book.description = req.body.description
    if(req.body.cover != null && req.body.cover !== '') {
      saverCover(book, req.body.cover)
    }
    // res.redirect(`books/${newBook.id}`)
    await book.save()
    res.redirect(`/books/${book.id}`)
  } catch (err){
    console.log(err)
    if( book !== null) {
      renderEditPage(res, book, true)
    } else {
      redirect('/')
    }
  }
})

// 删除书籍
router.delete('/:id', async (req, res) =>{
  let book 
  try {
    book = await Book.findById(req.params.id)
    await book.remove()
    res.redirect('/books')
  } catch (err) {
    console.log(err)
    if(book != null) {
      res.render('books/show', {
        book: book,
        errorMessage: '不能删除这本书'
      })
    } else {
      res.redirect('/')
    }
  }
})

async function renderNewPage(res, book, hasError = false) {
  renderFormPage(res, book, 'new', hasError)
}

async function renderEditPage(res, book, hasError = false) {
  renderFormPage(res, book, 'edit', hasError)
}

async function renderFormPage(res, book, form, hasError = false) {
  try {
    const authors = await Author.find({})
    const params = {
      authors: authors,
      book: book
    }
    if (hasError) {
      if ( form === 'edit') {
        params.errorMessage = '更新异常'
      } else {
        params.errorMessage = '创建异常'
      }
    }
    res.render(`books/${form}`, params)
  } catch {
    res.redirect('/books')
  }
}

function saverCover(book, coverEncode) {
    if(coverEncode == null) return
    const cover = JSON.parse(coverEncode)
    if(cover != null && imageMimeTypes.includes(cover.type)) {
        book.coverImage = new Buffer.from(cover.data, 'base64')
        book.coverImageType = cover.type
    }
} 

module.exports = router;