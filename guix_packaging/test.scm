(use-modules (guix packages)
             (guix download)
             (guix build-system gnu)
             (guix licenses))
(package
  (name "test")
  (version "42.0")
  (source (origin
            (method url-fetch)
	    (uri (string-append "file:/root/test.tar.gz"))
            (sha256
             (base32
              "032r2v0a8z3ncrx7dsgzwnfqxjlj16a3mwj86icq6iwh0q42fgb2"))))
  (build-system gnu-build-system)
  (synopsis "Hello, Guix world: An example custom Guix package")
  (description
   "GNU Hello prints the message \"Hello, world!\" and then exits.  It
serves as an example of standard GNU coding practices.  As such, it supports
command-line arguments, multiple languages, and so on.")
  (home-page "https://www.gnu.org/software/hello/")
  (license gpl3+))
