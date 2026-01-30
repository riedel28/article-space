import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Article, ArticleBlockType,ArticleType } from '@/entities/Article';
import { useGetArticleForEdit } from '@/features/articleEditor';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

import ArticleEditPage from './ArticleEditPage';

const mockArticle: Article = {
  id: '1',
  title: 'Test Article Title',
  subtitle: 'Test Article Subtitle',
  img: 'https://example.com/image.png',
  views: 100,
  createdAt: '01.01.2024',
  type: [ArticleType.IT],
  user: {
    id: '1',
    username: 'admin'
  },
  blocks: [
    {
      id: '1',
      type: ArticleBlockType.TEXT,
      title: 'Introduction',
      paragraphs: ['This is the first paragraph.', 'This is the second paragraph.']
    }
  ]
};

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '1' })
}));

jest.mock('@/features/articleEditor', () => ({
  ...jest.requireActual('@/features/articleEditor'),
  useGetArticleForEdit: jest.fn()
}));

const mockUseGetArticleForEdit = useGetArticleForEdit as jest.Mock;

describe('ArticleEditPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading skeleton while fetching article', () => {
    mockUseGetArticleForEdit.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined
    });

    componentRender(<ArticleEditPage />, {
      route: '/articles/1/edit'
    });

    expect(screen.getByTestId('ArticleEditPage.Skeleton')).toBeInTheDocument();
  });

  test('renders error alert when fetch fails', () => {
    mockUseGetArticleForEdit.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 404 }
    });

    componentRender(<ArticleEditPage />, {
      route: '/articles/1/edit'
    });

    expect(screen.getByTestId('ArticleEditPage.Error')).toBeInTheDocument();
  });

  test('renders back button', () => {
    mockUseGetArticleForEdit.mockReturnValue({
      data: mockArticle,
      isLoading: false,
      error: undefined
    });

    componentRender(<ArticleEditPage />, {
      route: '/articles/1/edit'
    });

    const backButton = screen.getByTestId('ArticleEditPage.BackLink');
    expect(backButton).toBeInTheDocument();
    expect(backButton.tagName).toBe('BUTTON');
  });

  test('renders form with article data when loaded', async () => {
    mockUseGetArticleForEdit.mockReturnValue({
      data: mockArticle,
      isLoading: false,
      error: undefined
    });

    componentRender(<ArticleEditPage />, {
      route: '/articles/1/edit'
    });

    await waitFor(() => {
      expect(screen.getByTestId('ArticleEditForm.Title')).toHaveValue('Test Article Title');
    });

    expect(screen.getByTestId('ArticleEditForm.Subtitle')).toHaveValue('Test Article Subtitle');
  });

  test('shows validation error for empty title', async () => {
    mockUseGetArticleForEdit.mockReturnValue({
      data: mockArticle,
      isLoading: false,
      error: undefined
    });

    componentRender(<ArticleEditPage />, {
      route: '/articles/1/edit'
    });

    const titleInput = screen.getByTestId('ArticleEditForm.Title');
    await userEvent.clear(titleInput);

    const saveButton = screen.getByTestId('ArticleEditForm.SaveButton');
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Title must be at least 3 characters')).toBeInTheDocument();
    });
  });

  test('cancel button is present', () => {
    mockUseGetArticleForEdit.mockReturnValue({
      data: mockArticle,
      isLoading: false,
      error: undefined
    });

    componentRender(<ArticleEditPage />, {
      route: '/articles/1/edit'
    });

    expect(screen.getByTestId('ArticleEditForm.CancelButton')).toBeInTheDocument();
  });
});
