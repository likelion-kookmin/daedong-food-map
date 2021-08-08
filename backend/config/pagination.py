from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class StandardResultsSetPagination(PageNumberPagination):
    """# StandardResultsSetPagination
    - param 에서 page_size 값을 통해 page_size 값을 할당한다.
    - page_size를 None으로 할경우 param에서 page_size를 넘기지 않으면 전체 데이터를 가져온다.
    """

    page_size = None
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'previous_page': self.get_previous_link(),
                'next_page': self.get_next_link()
            },
            'count': self.page.paginator.count,
            'current_page': self.page.number,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })

