export interface IBooks {
  [books: string]: any;
}

export const BOOKS: IBooks = [
  // JavaScript
  {
    category: 'javascript',
    name: 'Eloquent Javascript A Modern Introduction to Programming',
    author: 'Marijn Haverbeke',
    year: '2018',
    pages: '447',
    format: 'PDF',
    downloadLink: 'https://bit.ly/35wKZPF',
    buyLink: 'https://amzn.to/3bSNm0l',
    description: 'Eloquent JavaScript dives into the JavaScript language to show programmers how to write elegant, effective JavaScript code. Like any good programming book,Eloquent JavaScriptbegins with fundamentals--variables, control structures, functions, and data structures--then moves on to complex topics like object-oriented programming and regular expressions',
    image: 'https://covers.zlibcdn2.com/covers299/books/e0/16/5a/e0165acb1767639826cf43eb5fab00e9.jpg',
  },
  {
    category: 'javascript',
    name: 'Learning JavaScript Design Patterns',
    author: 'Addy Osmani',
    year: '2012',
    pages: '199',
    format: 'PDF',
    downloadLink: 'https://bit.ly/2Zt7bq7',
    buyLink: 'https://amzn.to/3khG0X1',
    description: 'If you want to write beautiful, structured, and maintainable javascript code, this guide shows you how to apply both classical and modern design patterns to the language. The patterns in this book provide reusable code solutions to common problems in software design, and give you a shared vocabulary for describing solutions to others',
    image: 'https://covers.zlibcdn2.com/covers299/books/08/f6/16/08f6168945c836449f3e40e6c170ad67.jpg',
  },
  // JavaScript

  // Java
  {
    category: 'java',
    name: 'Java: The Complete Reference, Eleventh Edition',
    author: 'Herbert Schildt',
    year: '2019',
    pages: '1882',
    format: 'PDF',
    downloadLink: 'https://bit.ly/2RzMTXL',
    buyLink: 'https://amzn.to/35s1ZXk',
    description: 'Fully updated for Java SE 11, Java: The Complete Reference, Eleventh Edition explains how to develop, compile, debug, and run Java programs. Best-selling programming author Herb Schildt covers the entire Java language, including its syntax, keywords, and fundamental programming principles. You’ll also find information on key portions of the Java API library, such as I/O, the Collections Framework, the stream library, and the concurrency utilities. Swing, JavaBeans, and servlets are examined and numerous examples demonstrate Java in action. Of course, the very important module system is discussed in detail. This Oracle Press resource also offers an introduction to JShell, Java’s interactive programming tool. Best of all, the book is written in the clear, crisp, uncompromising style that has made Schildt the choice of millions worldwide.',
    image: 'https://covers.zlibcdn2.com/covers299/books/7f/b0/e5/7fb0e58e87aef95feae8c9d3a986a0a7.jpg',
  },
];
