import React from "react";

const InfoPanel = ({ location }) => {
  // 이미지 파일명에서 숫자를 제외한 기본 이름 추출
  const getBaseImageName = (imagePath) => {
    const fileName = imagePath.split("/").pop();
    return fileName.replace(/\d+\.jpg$/, "");
  };

  // 현재 선택된 지역의 모든 이미지 경로 생성
  const getAllImages = (location) => {
    if (!location || !location.image) return [];

    const baseName = getBaseImageName(location.image);
    const images = [];

    // 각 지역별 이미지 개수에 따라 경로 생성
    switch (baseName) {
      case "Hanseongbu":
        return [
          "/locations/Hanseongbu1.jpg",
          "/locations/Hanseongbu2.jpg",
          "/locations/Hanseongbu3.jpg",
        ];
      case "Suwonbu":
        return ["/locations/Suwonbu1.jpg", "/locations/Suwonbu2.jpg"];
      case "Jeonjubu":
        return ["/locations/Jeonjubu1.jpg", "/locations/Jeonjubu2.jpg"];
      case "Ganghwabu":
        return ["/locations/Ganghwabu1.jpg"];
      case "Pyongyangbu":
        return ["/locations/Pyongyangbu1.jpg", "/locations/Pyongyangbu2.jpg"];
      case "Daegubu":
        return ["/locations/Daegubu1.jpg", "/locations/Daegubu2.jpg"];
      case "Busanbu":
        return ["/locations/Busanbu1.jpg", "/locations/Busanbu2.jpg"];
      case "Incheonbu":
        return ["/locations/Incheonbu1.jpg", "/locations/Incheonbu2.jpg"];
      case "Gwangjubu":
        return ["/locations/Gwangjubu1.jpg", "/locations/Gwangjubu2.jpg"];
      default:
        return [location.image];
    }
  };

  return (
    <div className="w-[400px] h-full bg-white p-6 overflow-y-auto border-l">
      {!location ? (
        <div className="text-gray-500 text-center mt-8">
          마커를 클릭하면 정보가 표시됩니다.
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{location.name}</h2>
            <p className="text-gray-600">{location.oldName}</p>
          </div>

          {location.image && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">역사적 모습</h3>
              <div className="grid gap-4">
                {getAllImages(location).map((imagePath, index) => (
                  <div
                    key={index}
                    className="relative w-full h-[250px] overflow-hidden rounded-lg"
                  >
                    <img
                      src={imagePath}
                      alt={`${location.name}의 역사적 모습 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-2">설명</h3>
            <p className="text-gray-700">{location.description}</p>
          </div>

          {location.pastRoutes && location.pastRoutes.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">과거 도로</h3>
              <ul className="list-disc list-inside space-y-1">
                {location.pastRoutes.map((route, index) => (
                  <li key={index} className="text-gray-700">
                    {route.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {location.modernRoutes && (
            <>
              {location.modernRoutes.highways.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">현대 고속도로</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {location.modernRoutes.highways.map((route, index) => (
                      <li key={index} className="text-gray-700">
                        {route.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {location.modernRoutes.railways.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">현대 철도</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {location.modernRoutes.railways.map((route, index) => (
                      <li key={index} className="text-gray-700">
                        {route.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default InfoPanel;
