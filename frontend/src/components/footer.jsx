import React from 'react'
import { Github, Linkedin, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          {/* Author Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Built with <Heart className="inline h-4 w-4 text-red-500" /> by Nenavath Suresh
            </h3>
            <p className="text-gray-600 mb-4">
              AI-powered resume analysis application using Google Gemini
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="https://github.com/sureshnenavath"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="GitHub Profile"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/nenavath-suresh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>


          {/* Copyright */}
          <div className="text-sm text-gray-500">
            <p>© 2024 ResumeAI. All rights reserved.</p>
            <p className="mt-1">
              <a 
                href="https://github.com/sureshnenavath" 
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                @sureshnenavath
              </a> on GitHub
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
