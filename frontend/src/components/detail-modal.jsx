import React from 'react'
import { X, Star, TrendingUp, Target, Lightbulb, MapPin, GraduationCap, Briefcase, Award, Code, Globe } from 'lucide-react'
import { formatToIST } from '../utils/timezone.js'

const DetailModal = ({ analysis, onClose }) => {
  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-600'
    if (rating >= 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getRatingBg = (rating) => {
    if (rating >= 8) return 'bg-green-100'
    if (rating >= 6) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Resume Analysis Details</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Name:</strong> {analysis.name}</p>
                  <p className="text-sm"><strong>Email:</strong> {analysis.email}</p>
                  <p className="text-sm"><strong>Phone:</strong> {analysis.phone}</p>
                  {analysis.location && analysis.location !== 'Location not found' && (
                    <p className="text-sm flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <strong>Location:</strong> {analysis.location}
                    </p>
                  )}
                  <p className="text-sm"><strong>File:</strong> {analysis.filename}</p>
                </div>
              </div>

              {/* Resume Rating */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Resume Rating
                </h3>
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getRatingBg(analysis.resume_rating)} mb-2`}>
                    <span className={`text-2xl font-bold ${getRatingColor(analysis.resume_rating)}`}>
                      {analysis.resume_rating}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">out of 10</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Stats</h3>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Core Skills:</strong> {analysis.core_skills?.length || 0}</p>
                  <p className="text-sm"><strong>Soft Skills:</strong> {analysis.soft_skills?.length || 0}</p>
                  <p className="text-sm"><strong>Work Experience:</strong> {analysis.work_experience?.length || 0}</p>
                  <p className="text-sm"><strong>Education:</strong> {analysis.education?.length || 0}</p>
                  <p className="text-sm"><strong>Projects:</strong> {analysis.projects?.length || 0}</p>
                  <p className="text-sm"><strong>Suggestions:</strong> {analysis.upskill_suggestions?.length || 0}</p>
                  <p className="text-sm"><strong>Analyzed:</strong> {formatToIST(analysis.created_at)}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Core Skills */}
              <div className="bg-white border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Core Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(analysis.core_skills || []).map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="bg-white border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(analysis.soft_skills || []).map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Improvement Areas */}
            <div className="mt-6 bg-white border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Improvement Areas</h3>
              <p className="text-gray-700 leading-relaxed">{analysis.improvement_areas}</p>
            </div>

            {/* Summary */}
            {analysis.summary && (
              <div className="mt-6 bg-white border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Summary</h3>
                <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
              </div>
            )}

            {/* Work Experience */}
            {analysis.work_experience && analysis.work_experience.length > 0 && (
              <div className="mt-6 bg-white border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Work Experience
                </h3>
                <div className="space-y-4">
                  {(analysis.work_experience || []).map((exp, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{exp.position}</h4>
                        <span className="text-sm text-gray-500">{exp.duration}</span>
                      </div>
                      <p className="text-sm font-medium text-blue-600 mb-1">{exp.company}</p>
                      <p className="text-sm text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {analysis.education && analysis.education.length > 0 && (
              <div className="mt-6 bg-white border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Education
                </h3>
                <div className="space-y-3">
                  {(analysis.education || []).map((edu, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                          <p className="text-sm text-blue-600">{edu.institution}</p>
                        </div>
                        <span className="text-sm text-gray-500">{edu.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {analysis.projects && analysis.projects.length > 0 && (
              <div className="mt-6 bg-white border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Projects
                </h3>
                <div className="space-y-3">
                  {(analysis.projects || []).map((project, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 mb-1">{project.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {(project.technologies || []).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {analysis.certifications && analysis.certifications.length > 0 && (
              <div className="mt-6 bg-white border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(analysis.certifications || []).map((cert, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {analysis.languages && analysis.languages.length > 0 && (
              <div className="mt-6 bg-white border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(analysis.languages || []).map((lang, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Upskill Suggestions */}
            <div className="mt-6 bg-white border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                Upskill Suggestions
              </h3>
              <div className="space-y-3">
                {(analysis.upskill_suggestions || []).map((suggestion, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 mb-1">{suggestion.skill}</h4>
                    <p className="text-sm text-gray-600">{suggestion.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailModal