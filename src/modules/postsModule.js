import { storyAPI, likeAPI, commentAPI } from '../utils/apiClient';
import logger from '../utils/frontendLogger';

// Create a new story
export const createStory = async (content) => {
  try {
    
    logger.logUserAction('Creating story', { contentLength: content.length });
    const response = await storyAPI.createStory(content);

    if (response.success) {
      logger.info('Story created successfully', { storyId: response.data._id });
      return response;
    } else {
      logger.warn('Story creation failed', { error: response.error });
      return response;
    }
  } catch (error) {
    logger.logError('Story Creation Error', error);
    return { success: false, error: error.message };
  }
};

// Get all stories
export const getStories = async (page = 1, limit = 10) => {
  try {
    logger.debug('Fetching stories', { page, limit });
    const response = await storyAPI.getStories(page, limit);

    if (response.success) {
      logger.debug('Stories fetched successfully', {
        count: response.data.stories?.length,
        total: response.data.pagination?.total,
      });
      return response;
    } else {
      logger.warn('Failed to fetch stories', { error: response.error });
      return response;
    }
  } catch (error) {
    logger.logError('Fetch Stories Error', error);
    return { success: false, error: error.message };
  }
};

// Get user stories
export const getUserStories = async (userId) => {
  try {
    logger.debug('Fetching user stories', { userId });
    const response = await storyAPI.getUserStories(userId);

    if (response.success) {
      logger.debug('User stories fetched', { count: response.data?.length });
      return response;
    } else {
      logger.warn('Failed to fetch user stories', { error: response.error });
      return response;
    }
  } catch (error) {
    logger.logError('Fetch User Stories Error', error, { userId });
    return { success: false, error: error.message };
  }
};

// Like a story
export const likeStory = async (storyId) => {
  try {
    logger.logUserAction('Liking story', { storyId });
    const response = await likeAPI.likeStory(storyId);

    if (response.success) {
      logger.info('Story liked successfully', { storyId });
      return response;
    } else {
      logger.warn('Failed to like story', { error: response.error });
      return response;
    }
  } catch (error) {
    logger.logError('Like Story Error', error, { storyId });
    return { success: false, error: error.message };
  }
};

// Unlike a story
export const unlikeStory = async (storyId) => {
  try {
    logger.logUserAction('Unliking story', { storyId });
    const response = await likeAPI.unlikeStory(storyId);

    if (response.success) {
      logger.info('Story unliked successfully', { storyId });
      return response;
    } else {
      logger.warn('Failed to unlike story', { error: response.error });
      return response;
    }
  } catch (error) {
    logger.logError('Unlike Story Error', error, { storyId });
    return { success: false, error: error.message };
  }
};

// Add comment to story
export const addCommentToStory = async (storyId, text) => {
  try {
    logger.logUserAction('Adding comment', { storyId, textLength: text.length });
    const response = await commentAPI.addComment(storyId, text);

    if (response.success) {
      logger.info('Comment added successfully', { storyId });
      return response;
    } else {
      logger.warn('Failed to add comment', { error: response.error });
      return response;
    }
  } catch (error) {
    logger.logError('Add Comment Error', error, { storyId });
    return { success: false, error: error.message };
  }
};

// Get comments for story
export const getStoryComments = async (storyId) => {
  try {
    logger.debug('Fetching story comments', { storyId });
    const response = await commentAPI.getComments(storyId);

    if (response.success) {
      logger.debug('Comments fetched', { count: response.data?.length });
      return response;
    } else {
      logger.warn('Failed to fetch comments', { error: response.error });
      return response;
    }
  } catch (error) {
    logger.logError('Fetch Comments Error', error, { storyId });
    return { success: false, error: error.message };
  }
};

// Delete comment
export const deleteComment = async (storyId, commentId) => {
  try {
    logger.logUserAction('Deleting comment', { storyId, commentId });
    const response = await commentAPI.deleteComment(storyId, commentId);

    if (response.success) {
      logger.info('Comment deleted successfully', { storyId, commentId });
      return response;
    } else {
      logger.warn('Failed to delete comment', { error: response.error });
      return response;
    }
  } catch (error) {
    logger.logError('Delete Comment Error', error, { storyId, commentId });
    return { success: false, error: error.message };
  }
};
